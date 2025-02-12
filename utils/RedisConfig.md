# RedisConfig
```java
@EnableConfigurationProperties(CacheProperties.class)
@EnableCaching
@Slf4j
@Configuration
public class RedisConfig implements CachingConfigurer {

    @Override
    public KeyGenerator keyGenerator() {
        return (target, method, params) -> {
            // 格式化缓存 key 字符串
            StringBuilder sb = new StringBuilder();
            // 追加类名
            sb.append(target.getClass().getName());
            // 追加方法名
            sb.append(method.getName());
            // 遍历参数并且追加
            for (Object obj : params) {
                sb.append(obj.toString());
            }
            log.debug("调用Redis缓存key：%s".formatted(sb));
            return sb.toString();
        };
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.setValueSerializer(getSerializer());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(getSerializer());
        redisTemplate.setHashValueSerializer(getSerializer());
        redisTemplate.afterPropertiesSet();
        // 设置redis支持数据库事务
        // redisTemplate.setEnableTransactionSupport(true);
        return redisTemplate;
    }

    @Bean
    public CacheManager cacheManager(
            RedisConnectionFactory factory, CacheProperties cacheProperties) {
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        // 配置序列化
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig();
        RedisCacheConfiguration redisCacheConfiguration =
                config
                        .serializeKeysWith(
                                RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
                        .serializeValuesWith(
                                RedisSerializationContext.SerializationPair.fromSerializer(getSerializer()));

        CacheProperties.Redis redisProperties = cacheProperties.getRedis();
        if (redisProperties.getTimeToLive() != null) {
            redisCacheConfiguration = redisCacheConfiguration.entryTtl(redisProperties.getTimeToLive());
        }
        if (redisProperties.getKeyPrefix() != null) {
            redisCacheConfiguration =
                    redisCacheConfiguration.prefixCacheNameWith(redisProperties.getKeyPrefix());
        }
        if (!redisProperties.isCacheNullValues()) {
            redisCacheConfiguration = redisCacheConfiguration.disableCachingNullValues();
        }
        if (!redisProperties.isUseKeyPrefix()) {
            redisCacheConfiguration = redisCacheConfiguration.disableKeyPrefix();
        }
        return RedisCacheManager.builder(factory).cacheDefaults(redisCacheConfiguration).build();
    }

    /**
     * 实例化 HashOperations 对象,可以使用 Hash 类型操作
     *
     * @param redisTemplate redisTemplate
     * @return HashOperations
     */
    @Bean
    public HashOperations<String, String, Object> hashOperations(
            RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForHash();
    }

    /**
     * 实例化 ValueOperations 对象,可以使用 String 操作
     *
     * @param redisTemplate redisTemplate
     * @return ValueOperations
     */
    @Bean
    public ValueOperations<String, Object> valueOperations(
            RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForValue();
    }

    /**
     * 实例化 ListOperations 对象,可以使用 List 操作
     *
     * @param redisTemplate redisTemplate
     * @return ListOperations
     */
    @Bean
    public ListOperations<String, Object> listOperations(
            RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForList();
    }

    /**
     * 实例化 SetOperations 对象,可以使用 Set 操作
     *
     * @param redisTemplate redisTemplate
     * @return SetOperations
     */
    @Bean
    public SetOperations<String, Object> setOperations(RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForSet();
    }

    /**
     * 实例化 ZSetOperations 对象,可以使用 ZSet 操作
     *
     * @param redisTemplate redisTemplate
     * @return ZSetOperations
     */
    @Bean
    public ZSetOperations<String, Object> zSetOperations(
            RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForZSet();
    }

    private Jackson2JsonRedisSerializer<Object> getSerializer() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        objectMapper.activateDefaultTyping(
                LaissezFaireSubTypeValidator.instance,
                ObjectMapper.DefaultTyping.NON_FINAL,
                JsonTypeInfo.As.PROPERTY);
        // 配成false,就是有个别请求参数不对应,也会将请求参数正常解析为User对象;如果配成true,如果遇到请求参数不对应,就会抛异常,返回400.
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return new Jackson2JsonRedisSerializer<>(objectMapper, Object.class);
    }
}

```
