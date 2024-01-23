# ThreadLocalUtils

```java
public class JacksonUtils {

    static final Logger log = LoggerFactory.getLogger(JacksonUtils.class);

    private static final ObjectMapper MAPPER = new ObjectMapper();


    static {
        MAPPER.setTimeZone(TimeZone.getTimeZone("GMT+8"));
        MAPPER.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        MAPPER.setSerializationInclusion(Include.NON_NULL);
        MAPPER.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        MAPPER.configure(SerializationFeature.INDENT_OUTPUT, false);
        MAPPER.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        MAPPER.configure(Feature.ALLOW_SINGLE_QUOTES, true);
    }

    private JacksonUtils() {
    }

    /**
     * 将实体对象转换为json字符串
     *
     * @param entity 实体对象
     * @param <T>    泛型
     * @return json string
     */
    public static <T> String obj2json(T entity) {
        try {
            return MAPPER.writeValueAsString(entity);
        } catch (JsonProcessingException e) {
            log.error("将实体对象转换为json字符串失败{}", e.getLocalizedMessage());
        }
        return "";
    }

    /**
     * 将实体对象转换为json字符串
     *
     * @param entity 实体对象
     * @param pretty 是否转换为美观格式
     * @param <T>    泛型
     * @return json string
     */
    public static <T> String obj2json(T entity, boolean pretty) {
        try {
            if (pretty) {
                return MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(entity);
            }
            return MAPPER.writeValueAsString(entity);
        } catch (JsonProcessingException e) {
            log.error("将实体对象转换为json字符串失败{}", e.getLocalizedMessage());
        }
        return "";
    }

    /**
     * 将实体对象转换为字节数组
     *
     * @param entity 实体对象
     * @param <T>    泛型
     * @return json string
     */
    public static <T> byte[] obj2jsonBytes(T entity) {
        try {
            return MAPPER.writeValueAsBytes(entity);
        } catch (JsonProcessingException e) {
            log.error("将实体对象转换为字节数组失败{}", e.getLocalizedMessage());
        }
        return new byte[0];
    }

    /**
     * 将实体类转换为JsonNode对象
     *
     * @param entity 实体对象
     * @param <T>    泛型
     * @return JsonNode
     */
    public static <T> JsonNode obj2node(T entity) {
        return MAPPER.valueToTree(entity);
    }

    /**
     * 将实体对象写入文件
     *
     * @param filepath 文件绝对路径
     * @param entity   实体对象
     * @param <T>      泛型
     * @return 写入成功：true，否则：false
     */
    public static <T> boolean write2jsonFile(String filepath, T entity) {
        File file = new File(filepath);
        if (!file.exists()) {
            try {
                boolean success = file.createNewFile();
                if (!success) {
                    log.error("[write2jsonFile]-创建文件失败！路径：{}", filepath);
                    return false;
                }
            } catch (IOException e) {
                log.error("[write2jsonFile]-创建文件失败！路径：{}，失败原因：{}", filepath, e.getMessage());
                return false;
            }
        }
        return write2jsonFile(new File(filepath), entity);
    }

    /**
     * 将实体对象写入指定文件
     *
     * @param file   文件
     * @param entity 实体对象
     * @param <T>    泛型
     * @return 写入成功：true，否则：false
     */
    public static <T> boolean write2jsonFile(File file, T entity) {
        try {
            MAPPER.writeValue(file, entity);
            return true;
        } catch (IOException e) {
            log.error("[write2jsonFile]-写入文件失败！路径：{}，失败原因：{}", file.getAbsolutePath(), e.getMessage());
        }
        return false;
    }

    /**
     * 将json字符串转换为实体类对象
     *
     * @param json json字符串
     * @param type 实体对象类型
     * @param <T>  泛型
     * @return 转换成功后的对象
     */
    public static <T> T json2obj(String json, Class<T> type) {
        try {
            return MAPPER.readValue(json, type);
        } catch (JsonProcessingException e) {
            log.error("将json字符串转换为实体类对象失败{}", e.getLocalizedMessage());
        }
        return null;
    }

    /**
     * 将json字符串转换为map
     *
     * @param json json字符串
     * @return Map
     */
    public static Map<String, Object> json2map(String json) {
        try {
            return (Map<String, Object>) MAPPER.readValue(json, Map.class);
        } catch (JsonProcessingException e) {
            log.error("将实体对象转换为json字符串失败{}", e.getLocalizedMessage());
        }
        return Collections.emptyMap();
    }


    /**
     * 泛化转换方式，此方式最为强大、灵活
     * <p>
     * example：
     * <p>
     * {@code Map<String, List<UserInfo>> listMap = genericConvert(jsonStr, new TypeReference<Map<String, List<UserInfo>>>() {});}
     *
     * @param json json字符串
     * @param type type
     * @param <T>  泛化
     * @return T
     */
    public static <T> T genericConvert(String json, TypeReference<T> type) {
        try {
            return MAPPER.readValue(json, type);
        } catch (JsonProcessingException e) {
            log.error("泛化转换失败{}", e.getLocalizedMessage());
        }
        return null;
    }


    /**
     * 将map转换为实体类对象
     *
     * @param map  map
     * @param type 实体对象类型
     * @param <T>  泛型
     * @return 实体对象
     */
    public static <T> T map2obj(Map map, Class<T> type) {
        return MAPPER.convertValue(map, type);
    }

    /**
     * 将文件内容转为实体类对象
     *
     * @param file 文件
     * @param type 实体类类型
     * @param <T>  泛型
     * @return 实体类对象
     * @throws IOException IOException
     */
    public static <T> T file2obj(File file, Class<T> type) {
        try {
            return MAPPER.readValue(file, type);
        } catch (IOException e) {
            log.error("将文件内容转为实体类对象失败{}", e.getLocalizedMessage());
        }
        return null;
    }

    /**
     * 将url指向的资源转换为实体类对象
     *
     * @param url  url
     * @param type 实体类对象类型
     * @param <T>  泛型
     * @return 实体类对象
     * @throws IOException IOException
     */
    public static <T> T urlResource2obj(URL url, Class<T> type) {
        try {
            return MAPPER.readValue(url, type);
        } catch (IOException e) {
            log.error("将url指向的资源转换为实体类对象失败{}", e.getLocalizedMessage());
        }
        return null;
    }

    /**
     * 将json字符串转换为实体类集合
     *
     * @param json json字符串
     * @param type 实体对象类型
     * @param <T>  泛型
     * @return list集合
     */
    public static <T> List<T> json2list(String json, Class<T> type) {
        CollectionType collectionType = MAPPER.getTypeFactory().constructCollectionType(List.class, type);
        try {
            return MAPPER.readValue(json, collectionType);
        } catch (JsonProcessingException e) {
            log.error("将json字符串转换为实体类集合失败{}", e.getLocalizedMessage());
        }
        return Collections.emptyList();
    }


    /**
     * 将json字符串转换为JsonNode对象
     *
     * @param json json字符串
     * @return JsonNode对象
     */
    public static JsonNode json2node(String json) {
        try {
            return MAPPER.readTree(json);
        } catch (JsonProcessingException e) {
            log.error("将实体对象转换为json字符串失败{}", e.getLocalizedMessage());
        }
        return null;
    }


    /**
     * 检查字符串是否是json格式
     *
     * @param str 待检查字符串
     * @return 是：true，否：false
     */
    public static boolean isJsonString(String str) {
        try {
            MAPPER.readTree(str);
            return true;
        } catch (Exception e) {
            if (log.isDebugEnabled()) {
                log.debug("[isJsonString]-检查字符串是否是json格式...{}", e.getMessage());
            }
            return false;
        }
    }

    /**
     * 打印json到控制台
     *
     * @param obj    需要打印的对象
     * @param pretty 是否打印美观格式
     * @param <T>    泛型
     */
    public static <T> void printJson(T obj, boolean pretty) {
        try {
            if (pretty) {
                System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(obj));
            } else {
                System.out.println(MAPPER.writeValueAsString(obj));
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
```
