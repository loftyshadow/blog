| 指令名 | 功能描述 |
| ------ | -------- |
| FROM | 指定基础镜像或父级镜像 |
| LABEL | 为镜像添加元数据 |
| ENV | 设置环境变量 |
| WORKDIR | 指定后续指令的工作目录，类似于 Linux 中的 cd 命令 |
| USER | 指定当前构建阶段以及容器运行时的默认用户，以及可选的用户组 |
| VOLUME | 创建具有指定名称的挂载数据卷，用于数据持久化 |
| ADD | 将构建上下文中指定目录下的文件复制到镜像文件系统的指定位置 |
| COPY | 功能和语法与 ADD 类似，但是不会自动解压文件，也不能访问网络资源 |
| EXPOSE | 约定容器运行时监听的端口，通常用于容器与外界之间的通信 |
| RUN | 用于在构建镜像过程中执行命令 |
| CMD | 构建镜像成功后，所创建的容器启动时执行的命令，常与 ENTRYPOINT 结合使用 |
| ENTRYPOINT | 用于配置容器以可执行的方式运行，常与 CMD 结合使用 |

Dockerfile 描述了组装镜像的步骤，其中每条指令都是单独执行的。除了FROM指令，其他每一条指令都会在上一条指令所生成镜像的基础上执行，执行完后会生成一个新的镜像层，新的镜像层覆盖在原来的镜像之上从而形成了新的镜像。Dockerfile所生成的最终镜像就是在基础镜像上面叠加一层层的镜像层组件的。Dockerfile 分为四部分：基础镜像信息、维护者信息、镜像操作指令和容器启动时执行指令。

Dockerfile 中指令不区分大小写，以 “#” 开头的是注释行，而在其他位置出现的 “#” 会被当成参数。

**基础示例**：
```
# 基础镜像
FROM openjdk:8-jdk-alpine AS openjdk8
# 维护者信息
LABEL maintainer="1094290505@qq.com"
# 镜像操作指令
RUN echo "JAVA_HOME"
# 容器启动时执行的指令
CMD ["java -version"]
```

执行`docker build -t .`来构建镜像

# FROM
指定基础镜像或父级镜像
```
语法
  FROM [--platform=<platform>] <image> [AS <name>]
  FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
  FROM [--platform=<platform>] <image>[@<digest>] [AS <name>]
示例
  FROM redis
  FROM redis:7.0.5
  FROM redis@7614ae9453d1
```

**注意事项**
- 单个dockfile可以多次出现 FROM ，以使用之前的构建阶段作为另一个构建阶段的依赖项
- AS name表示为构建阶段命名，在后续FROM和COPY --from=\<name\>说明中可以使用这个名词，引用此阶段构建的映像
- digest其实就是就是根据镜像内容产生的一个ID，只要镜像的内容不变digest也不会变
- tag或digest值是可选的。如果您省略其中任何一个，构建器默认使用一个latest标签。如果找不到该tag值，构建器将返回错误。
- --platform标志可用于在FROM引用多平台镜像的情况下指定平台。例如，linux/amd64、linux/arm64、 或windows/amd64

FROM多阶段构建：
在17.05版本之前的Docker，只允许Dockerfile中出现一个FROM指令，但在此之后，可以在一个Dockerfile中出现多个FROM用来实现多阶段构建。

**使用说明**：
每一条 FROM 指令都是一个构建阶段，多条 FROM 就是多阶段构建，虽然最后生成的镜像只能是最后一个阶段的结果，但是，能够将前置阶段中的文件拷贝到后边的阶段中，这就是多阶段构建的最大意义。

```
# 第一阶段构建，设置基础镜像，并设置别名在其他构建阶段可以直接使用
FROM gradle:8.7.0-jdk AS gradle-latest
# 维护者信息
LABEL maintainer="Niemingzhi"
# 设置工作空间，后续命令会在此目录下执行
WORKDIR /app
# 添加文件到容器中
COPY . /app/
# 执行打包命令
RUN gradle clean bootJar

# 第二阶段构建，以第一阶段构建为基础，再次进行构建步骤
FROM openjdk:21-jdk-oracle
WORKDIR /accounting
# 从第一阶段复制结果
# 如果要用的阶段没有设置别名，那么要使用--from=n，n表示从0开始的标记位
COPY --from=gradle-latest /app/ .
# 容器启动时执行的指令
ENTRYPOINT ["/bin/sh", "-c", "java -jar ./build/libs/accounting-0.0.1-SNAPSHOT.jar"]
```

# RUN

```text
shell 格式：RUN <command> (/bin/sh -c /S /C)
exec 格式：RUN ["executable", "param1", "param2"]
```
RUN指令将会在前一条命令创建出的镜像的基础之上创建一个容器，并在容器中运行命令，在命令结束运行后提交容器为新镜像，新镜像将被Dockerfile中的下一条指令使用。

**使用说明**：
1. 使用exec格式时，命令是直接运行的，exec格式中的参数会作为JSON数组被Docker解析，所以在使用exec格式命令时，参数必须使用双引号不能单引号；
2. 使用shell格式时，命令通过 /bin/sh -c 运行，可以使用反斜杠（\）将单个RUN指令继续到下一行。
3. RUN指令将执行所有合法命令并提交执行结果，RUN指令创建的中间镜像会被缓存，并会在下次构建中使用。如果不想使用这些缓存镜像，可以在构建时指定 --no-cache 参数，如：docker build --no-cache。

# CMD

```
exec格式（推荐）：CMD ["executable","param1","param2"]
entrypoint格式：CMD ["param1","param2"] 
shell格式：CMD command param1 param2
```
Docker 不是虚拟机，容器就是进程。既然是进程，那么在启动容器的时候，需要指定所运行的程序及参数。CMD 指令就是用于指定默认的容器主进程的启动命令的。它的主要目的是为执行中的容器提供默认值。

**使用说明**：
1. shell格式和exec格式使用时，命令在容器中的运行方式和RUN一样，其规则同样适用；
2. 每个Dockerfile 只会执行一条CMD指令，如果Dockerfile中存在多条CMD指令命令，只有最后一条会被执行；
3. 如果用户启动容器时候指定了运行的命令，则会覆盖掉CMD指定的命令。
4. entrypoint格式是在CMD指令和ENTRYPOINT指令配合时使用的，CMD指令中的参数会被添加到ENTRYPOINT指令中；
5. 如果使用CMD为ENTRYPOINT指令提供默认参数，CMD和ENTRYPOINT指令都应以JSON数组格式指定；

# LABEL

```
LABEL <key>=<value> <key>=<value> <key>=<value> ...
```

**使用说明**：
1. LABEL指令以key=value方式给镜像添加元数据，要在LABEL值中包含空格，请使用引号和反斜杠，就像在命令行解析中一样；
2. 基础镜像、父镜像中包含的标签会被继承，如果镜像中标签已经存在但具有不同的值，则后面设置的值会覆盖先前设置的值；
3. 一个镜像中可以有多个标签。您可以在一行上指定多个标签。

**构建示例**

```
# 基础镜像
FROM openjdk:8-jdk-alpine AS openjdk8
# 维护者信息
LABEL maintainer="liwenqiang@tseveryday.com"
# 多标签：标记版本号及描述信息，
LABEL version="1.0" description="This text illustrates \
that label-values can span multiple lines."
```
使用`docker inspect`命令查看image的labels

# EXPOSE

```
语法
  EXPOSE <port> [<port>/<protocol>...]
示例
  EXPOSE 8080
  EXPOSE 80/tcp
  EXPOSE 80/udp
  EXPOSE 9090/tcp 9090/udp
```

EXPOSE指令通知Docker容器在运行时监听指定的网络端口，可以指定端口是侦听TCP还是UDP，如果未指定协议，则默认值为TCP。

**使用说明**：
1. 无论EXPOSE设置如何，都可以在运行时使用-p参数覆盖它们，例如：docker run -p 8080:80；
2. EXPOSE 指令是声明运行时容器提供服务端口，这只是一个声明，在运行时并不会因为这个声明应用就会对外暴露这个端口，只有在docker run 时显示指定 -p 外部端口:容器端口，才会对外暴露。
在 Dockerfile 中使用EXPOSE声明端口有两个好处：

帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射；
在运行时使用随机端口映射时，也就是 `docker run -P` 时，会自动随机映射 `EXPOSE` 的端口。

# ENV

```
语法
  ENV <key>=<value> ...
  ENV <key> <value>
示例
FROM golang:1.10.3 as builder
RUN yum install -y gcc \
    && yum install -y gcc-c++ kernel-devel make
ENV GOPATH /go
ENV PATH $PATH:$GOPATH/bin
```
`ENV`指令将镜像运行时环境变量`<key>`设置为`<value>`。此值将在构建阶段中所有后续指令的环境中使用，并且在许多情况下也可以内联替换。

可以通过命令：`docker run -e "key=value"`来覆盖Dockerfile中的设置项的值。

**使用说明**：
设置一个时，第一个空格后面的整个字符串将被视为`<value>` 包括空格和引号等字符；
设置多个时，这种形式在语法中使用"="，与命令行解析一样，引号和反斜杠可用于在值内包含空格。

# ADD
```
ADD [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

*注：–chown 仅在用于在Linux上构建容器时的Dockerfile上可用，在Windows容器上不起作用*

ADD指令是有上下文的（默认为当前Dockerfile所在目录），从Dockerfile文件相对的\<src\>路径下复制其下的文件/文件夹到Docker镜像的工作目录下的相对的\<dest\>目录。

例如：linux的/home/user/src下执行Dockerfile构建镜像，要添加/home/user/src/demo文件夹所有内容到docker镜像的/app工作目录下，需要设置`ADD . /app/` 。

\<src\>也可以为远程文件URL，当\<src\>是远程文件URL的情况下，目标将具有600的权限。如果正在检索的远程文件具有HTTP Last-Modified 的标头，则来自该标
规则：
\<src\>路径必须在构建的上下文中，不能ADD ../something /target，因为docker构建的第一步是发送上下文目录（和子目录）到docker守护进程。
如果\<src\>是URL并且\<dest\>不以尾部斜杠结尾，则从URL下载文件并将其复制到\<dest\>。
如果\<src\>是URL并\<dest\>以尾部斜杠结尾，则从URL中推断文件名，并将文件下载到\<dest\>/\<filename\>。例如，ADD http://example.com/foobar /会创建文件/foobar。网址必须有一个非平凡的路径，以便在这种情况下可以发现一个适当的文件名（http://example.com不会工作）。头的时间戳将用于设置目的地上的mtime文件，另外像在ADD期间处理的任何其它文件一样，mtime将不包括在确定文件是否已经改变并且高速缓存应该被更新。

**使用说明**：
1. \<src\>资源可以指定多个，但如果指定的是文件或目录，会被解析为基于镜像上下文的相对路径。
2. 如果\<src\>是目录，则复制目录的整个内容，包括文件系统元数据。
3. 如果URL文件使用身份验证保护，则需要使用`RUN wget`，`RUN curl`或从容器内使用其他工具，因为`ADD`指令不支持身份验证。
4. 在Dockerfile构建镜像时使用`docker build - <somefile`构建，这时没有构建上下文，所以Dockerfile只能包含一个基于URL的ADD指令。
5. 可以通过命令传递压缩归档文件：`docker build - <archive.tar.gz`，归档根目录下的Dockerfile和归档的其余部分将在构建的上下文中使用。
6. 如果\<src\>是识别的压缩格式（identity，gzip，bzip2或xz）的本地tar存档，则将其解包为目录（识别是基于文件内容的而不是文件名，例如文件名是demo.tar.gz，但是文件是空的，就不会去解压）。来自远程URL的资源不会解压缩。
7. 如果直接或由于使用通配符指定了多个\<src\>资源，则\<dest\>必须是目录，并且必须以斜杠/结尾。
8. 如果\<dest\>不以尾部斜杠结尾，它将被视为常规文件，\<src\>的内容将写在\<dest
9. 如果\<dest\>不存在，则会与其路径中的所有缺少的目录一起创建。

**构建示例**
```
# 设置基础镜像
FROM openjdk:8-jdk-alpine
# 复制jar包到镜像中
ADD https://oss.abeille.top/demo-0.0.1-SNAPSHOT.jar .
# 容器启动时执行的指令
ENTRYPOINT ["/bin/sh", "-c", "java -jar demo-0.0.1-SNAPSHOT.jar"]
```

# COPY

```
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```
*注：–chown仅在用于在Linux上构建容器时的Dockerfile上可用，在Windows容器上不起作用*
*–chown标志指定给定的用户名，组名或UID / GID组合以请求对复制内容的特定所有权*

COPY 指令复制\<src\>所指向的文件或目录，将它添加到新镜像中，复制的文件或目录在镜像中的路径是\<dest\>。\<src\>所指定的源可以有多个，但必须在上下文中，即必须是上下文根目录的相对路径。

**使用说明**：
1. \<src\>可以使用通配符指向所有匹配通配符的文件或目录；
2. \<dest\>可以是文件或目录，但是必须是目标镜像中的绝对路径或者相对于WORKDIR 的相对路径；
3. 若\<src\>或\<dest\>以斜杠/结尾，则其指向的是目录，否则指向文件。
4. 若\<dest\>是一个文件，则\<src\>的内容会被写入到\<dest\>中，否则\<src\>所指向的文件或目录中的内容会被复制添加到\<dest\>目录中。
5. 当\<src\>指定多个源时，\<dest\>必须是目录，如果\<dest\>不存在，则会被创建。

**构建示例**
```
# 设置基础镜像
FROM openjdk:8-jdk-alpine
# 复制jar包到镜像中
COPY /target/demo-0.0.1-SNAPSHOT.jar .
# 容器启动时执行的指令
ENTRYPOINT ["/bin/sh", "-c", "java -jar demo-0.0.1-SNAPSHOT.jar"]
```

对于不需要ADD的tar自动提取功能的其他项目（文件，目录），应始终使用COPY。

# ENTRYPOINT

```
exec格式：ENTRYPOINT ["executable", "param1", "param2"]
shell格式：ENTRYPOINT command param1 param2
```
ENTRYPOINT指令和 CMD 相似，都可以让容器在每次启动时执行相同的命令，但是又有不同的地方，CMD可以是命令，也可以是参数，而ENTRYPOINT只能是命令。

**使用说明**：
1. 在使用shell格式时，ENTRYPOINT指令会忽略所有的CMD指令和docker run 命令的参数，并且会运行在 /bin/sh -c 中，这就说明ENTRYPOINT指令进程为 /bin/sh -c 的子进程，进程在容器中的PID不是1，且不接受Unix信号，即在使用docker stop 命令时，命令进程接收不到SIGTERM信号；
2. ENTRYPOINT 在运行时也可以替代，不过比 CMD 要略显繁琐，需要通过 docker run --entrypoint来指定；
3. 当指定了 ENTRYPOINT 后，CMD 的含义就发生了改变，不再是直接的运行其命令，而是将 CMD 的内容作为参数传给 ENTRYPOINT 指令；
4. 在一个Dockerfile 中可以有多条ENTRYPOINT指令，但是只有最后一条有效；
5. 使用exec格式时，docker run 传入的命令会覆盖CMD指令的内容并且附加到ENTRYPOINT指令的参数中，而不会覆盖ENTRYPOINT指令的参数。
```
FROM openjdk:8-jdk-alpine
# 复制jar包到镜像中
ADD /target/demo-0.0.1-SNAPSHOT.jar .
# 容器启动时执行的指令
ENTRYPOINT ["/bin/sh", "-c", "java -jar demo-0.0.1-SNAPSHOT.jar"]
```

**理解CMD和ENTRYPOINT指令如何整合**
这两个指令都定义了当运行一个容器的时候，应运行什么命令，在合同使用时需遵守以下规则：

- Dockerfile应至少指定一个CMD或ENTRYPOINT命令。
- 使用容器作为可执行文件时，应定义ENTRYPOINT。
- CMD应该用作为ENTRYPOINT命令定义默认参数或在容器中执行ad-hoc命令的方法。
- 使用备用参数运行容器时，将覆盖CMD。

**RUN&CMD&ENTERPOINT区别**
RUN 执行命令并创建新的镜像层，RUN 经常用于安装软件包。
CMD 设置容器启动后默认执行的命令及其参数，但 CMD 能够被 `docker run` 后面跟的命令行参数替换。
ENTRYPOINT 配置容器启动时运行的命令。

# VOLUME
```
VOLUME ["/data"]
```
VOLUME指令创建具有指定名称的挂载点，并将其标记为从本机主机或其他容器保留外部挂载的卷。该值可以是JSON数组VOLUME \["/var/log/"\]或具有多个参数的纯字符串。为了防止运行时用户忘记将动态文件所保存目录挂载为卷，在 Dockerfile 中，我们可以事先指定某些目录挂载为匿名卷，这样在运行时如果用户不指定挂载，其应用也可以正常运行，不会向容器存储层写入大量数据。

**使用说明**：

基于Windows的容器上的卷：使用基于Windows的容器时，容器内的卷的目表地址必须是不存在或空目录，并且不能是 C 盘下的目录。
主机目录是在容器运行时声明的：主机目录（挂载点）从本质上说是依赖于主机的。这是为了保留镜像的可移植性，因为不能保证给定的主机目录在所有主机上都可用。因此，无法从Dockerfile内挂载主机目录。该VOLUME指令不支持指定host-dir 参数。创建或运行容器时，必须指定安装点。

可以把VOLUME理解为，从镜像中复制指定卷的文件夹到本地 /var/lib/docker/volumes/xxxxxxxxx/ 文件夹，然后把本地的该文件夹挂载到容器里面去。

因为VOLUME实际上就是在本地新建了一个文件夹挂载了，那么实际上容器内部的文件夹有三种情况：

1. 没有指定VOLUME也没有指定-v，这种是普通文件夹。
2. 指定了VOLUME没有指定-v，这种文件夹可以在不同容器之间共享，但是无法在本地修改。
3. 指定了-v的文件夹，这种文件夹可以在不同容器之间共享，且可以在本地修改。

# USER

```
USER <user>[:<group>]
USER <UID>[:<GID>]
```
指定运行容器时的用户名或 UID，后续的 RUN 也会使用指定用户。当服务不需要管理员权限时，可以通过该命令指定运行用户。并且可以在之前创建所需要的用户。

**使用说明**：
1. 在Windows上，如果不是内置帐户，则必须首先创建用户。这可以通过net user作为Dockerfile的一部分调用的命令来完成。
2. 当用户没有主要组时，镜像（或后续说明）将与该root组一起运行。

**构建示例**:
```
RUN groupadd -r dev && useradd -r -g dev dev
USER dev
RUN [ "systemctl start elasticsearch" ]
```

# WORKDIR

```
WORKDIR /path/to/workdir
```

为后续的 RUN、CMD、ENTRYPOINT 指令配置工作目录，在WORKDIR指令之前执行的指令，由于没有设置WORKDIR，它默认为当前镜像构建的上下文根目录，所以会基于根目录执行。

**使用说明**：
1. WORKDIR指令可以解析先前使用ENV设置的环境变量。您只能使用在Dockerfile中显式设置的环境变量；
2. 可以使用多个 WORKDIR 指令，后续命令如果参数是相对路径，则会基于之前命令指定的路径。
构建示例：
```
FROM openjdk:8-jdk-alpine
WORKDIR /everyday
WORKDIR chain
RUN pwd
```

# ARG
```
ARG <name>[=<default value>]
```

定义变量，与ENV 作用相同，不过ARG变量不会像ENV变量那样持久化到构建好的镜像中。

**使用说明**:
1. 不使用build-time变量来传递诸如github密钥，用户凭证等密码。构建时变量值使用docker history命令对图像的任何用户可见；
2. ARG 指令定义参数的默认值可以在 docker build 中用 --build-arg \<key\>=\<value\> 来覆盖；
3. 在 1.13 之前的版本，要求 --build-arg 中的参数名，必须在 Dockerfile 中用 ARG 定义过了，就是 --build-arg 指定的参数，必须在Dockerfile 中使用了。如果对应参数没有被使用，则会报错退出构建。从 1.13 开始，这种严格的限制被放开，不再报错退出，而是显示警告信息，并继续构建。

ARG和ENV指令的最大区别在于它们的作用域。ARG指令定义的参数仅在构建映像期间可用，而ENV指令定义的环境变量在容器运行时可用。因此，你可以使用ARG指令来传递构建参数，而使用ENV指令来设置容器的环境变量。

另一个区别是，ARG指令可以由--build-arg选项在构建时进行设置，而ENV指令在构建时无法更改。因此，如果你需要在构建时传递某些参数，你应该使用ARG指令。
ARG指令可以在FROM指令之前使用，但ENV指令则不能。这是因为FROM指令之前的任何指令都在构建上下文中执行，而FROM指令之后的指令则在新的构建阶段中执行。

# ONBUILD
```
ONBUILD [INSTRUCTION]
```
ONBUILD 是一个特殊的指令，它的功能时添加一个将来执行的触发器指令到镜像中，它后面跟的是其它指令，比如 RUN, COPY 等，而这些指令，在当前镜像构建时并不会被执行，当该镜像作为FROM指令的参数时， 这些触发器指令就会在FROM指令执行时加入到构建中。当需要构建一个基础镜像时，ONBUILD是很有用的。

**ONBUILD指令具体执行步骤**:
1. 在构建过程中，ONBUILD指令会添加到触发器指令镜像的云数据中，这些触发器不会再当前构建中执行；
2. 在构建过程最后，触发器指令会被存储在镜像详情中，其主键是OnBuild，可以使用docker inspect命令查看；
3. 构建完成后，该镜像可能作为其他Dockerfile中的FROM指令的参数，在构建时FROM指令会寻找ONBUILD触发器指令，并且会以它们注册的顺序执行。如果有触发器执行失败，则FROM指令被中止，并返回失败；如果所有的触发器执行成功，则FROM会执行下面的命令。在镜像构建完成后，触发器会被清除，不会被子孙镜像继承。

**使用说明**：
1. ONBUILD指令中不能包含 ONBUILD指令，并且不会触发FROM指令；
2. 使用ONBUILD指令的Dockerfile构建的镜像应该有特殊的标签，例如：demo:1.1.0-onbuild，这样做的好处是提示开发人员要在使用时注意；
3. 在ONBUILD指令中添加ADD和COPY指令时要特别注意，假如新构建过程的被添加的资源缺失了，会导致构建失败；

# BUILD
```
docker build -t imageName .
```
```
docker run -d --name imageName imageName:latest
```

设置docker容器空转，方便进入终端测试
```
# 设置了entrypoint的镜像启动姿势，重写entrypoint
docker run -dt --entrypoint sh imageName:latest
```
