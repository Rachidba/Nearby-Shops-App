package io.rachidba.api.controllers;

import io.rachidba.api.models.ApplicationUser;
import io.rachidba.api.models.Shop;
import io.rachidba.api.repositories.ApplicationUserRepository;
import io.rachidba.api.repositories.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ShopController {

    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private ApplicationUserRepository userRepository;
    @GetMapping("/shops")
    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    @GetMapping("/shops/liked")
    public List<Shop> getLikedShops() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        List<String> likedShops = userRepository.findByUsername(username).getLikedShops();
        return (List) shopRepository.findAllById(likedShops);
    }

}
