package io.rachidba.api.controllers;

import io.rachidba.api.models.ApplicationUser;
import io.rachidba.api.models.DislikedShop;
import io.rachidba.api.models.Shop;
import io.rachidba.api.repositories.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@RequestMapping("/api")

// The endpoint that enables new users to register
public class UserController {

    @Autowired
    private ApplicationUserRepository applicationUserRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/sign-up")
    public void signUp(@RequestBody ApplicationUser user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        applicationUserRepository.save(user);
    }

    @PostMapping("/like-shop")
    public ResponseEntity<String> likeShop(@RequestBody Shop shop) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        ApplicationUser user = applicationUserRepository.findByUsername(username);
        if(!user.getLikedShops().contains(shop.getId())) {
            user.getLikedShops().add(shop.getId());
            applicationUserRepository.save(user);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @PostMapping("/remove-shop")
    public ResponseEntity<String> removeShop(@RequestBody Shop shop) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        ApplicationUser user = applicationUserRepository.findByUsername(username);
        if(user.getLikedShops().contains(shop.getId())) {
            user.getLikedShops().remove(shop.getId());
            applicationUserRepository.save(user);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @PostMapping("/dislike-shop")
    public ResponseEntity<String> dislikeShop(@RequestBody String shopId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        ApplicationUser user = applicationUserRepository.findByUsername(username);
        DislikedShop ds = new DislikedShop(new Timestamp(System.currentTimeMillis()).getTime(), shopId);
        if(!user.getDislikedShops().contains(ds)) {
            user.getDislikedShops().add(ds);
            applicationUserRepository.save(user);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
}
