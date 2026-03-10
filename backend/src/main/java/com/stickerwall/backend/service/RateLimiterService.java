package com.stickerwall.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RateLimiterService {

    private final StringRedisTemplate redis;

    public boolean allowRequest(String ipHash){

        String key = "rate_limit:" + ipHash;

        Long count = redis.opsForValue().increment(key);

        if(count == 1){
            redis.expire(key, Duration.ofHours(1));
        }

        return count <= 5;
    }
}