package io.rachidba.api.services;

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String AUTHORIZATION_HEADER_KEY = "Authorization";
    public static final String SIGN_UP_URL = "/api/sign-up";
}
