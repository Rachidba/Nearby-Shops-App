package io.rachidba.api.controllers;

import io.rachidba.api.models.ApplicationUser;
import io.rachidba.api.repositories.ApplicationUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

// The endpoint that enables new users to register
public class UserController {

    private ApplicationUserRepository applicationUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(ApplicationUserRepository applicationUserRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody ApplicationUser user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        applicationUserRepository.save(user);
    }

    @PostMapping("/like-shop")
    public ResponseEntity<String> likeShop(@RequestBody String shopId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        ApplicationUser user = applicationUserRepository.findByUsername(username);
        if(!user.getLikedShops().contains(shopId)) {
            user.getLikedShops().add(shopId);
            applicationUserRepository.save(user);
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping("/remove-shop")
    public ResponseEntity<String> removeShop(@RequestBody String shopId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        ApplicationUser user = applicationUserRepository.findByUsername(username);
        if(user.getLikedShops().contains(shopId)) {
            user.getLikedShops().remove(shopId);
            applicationUserRepository.save(user);
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
