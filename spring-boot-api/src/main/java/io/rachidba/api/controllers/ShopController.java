package io.rachidba.api.controllers;

import io.rachidba.api.models.Shop;
import io.rachidba.api.repositories.ApplicationUserRepository;
import io.rachidba.api.repositories.ShopRepository;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ShopController {

    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private ApplicationUserRepository userRepository;
    @GetMapping("/shops")
    public List<Shop> getAllShops(Pageable pageable) {
        Page<Shop> shops = shopRepository.findAll(pageable);
        return Lists.newArrayList(shops.iterator());
    }


    @GetMapping("/shops/liked")
    public List<Shop> getLikedShops(Pageable pageable) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        List<String> likedShops = userRepository.findByUsername(username).getLikedShops();
        return (List) shopRepository.findAllById(likedShops);
    }

}
