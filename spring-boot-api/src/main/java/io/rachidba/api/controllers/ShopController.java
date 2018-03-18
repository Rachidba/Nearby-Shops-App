package io.rachidba.api.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import io.rachidba.api.models.Shop;
import io.rachidba.api.repositories.ApplicationUserRepository;
import io.rachidba.api.repositories.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Metrics;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

import static org.springframework.data.domain.PageRequest.of;

@RestController
@RequestMapping("/api")
public class ShopController {

    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private ApplicationUserRepository userRepository;

    @GetMapping("/shops")
    public Page<Shop> getAllShops(Pageable pageable,
                                  @RequestParam("lat") String latitude,
                                  @RequestParam("long") String longitude,
                                  @RequestParam("d") double distance) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        List<String> likedShops = userRepository.findByUsername(username).getLikedShops();
        return this.shopRepository.findByLocationNearAndIdNotIn(
                new Point(Double.valueOf(longitude), Double.valueOf(latitude)),
                new Distance(distance, Metrics.KILOMETERS), likedShops, pageable);
    }

    @GetMapping("/shops/liked")
    public Page<Shop> getLikedShops(Pageable pageable,
                                  @RequestParam("lat") String latitude,
                                  @RequestParam("long") String longitude,
                                  @RequestParam("d") double distance) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        List<String> likedShops = userRepository.findByUsername(username).getLikedShops();
        return this.shopRepository.findByLocationNearAndIdIn(
                new Point(Double.valueOf(longitude), Double.valueOf(latitude)),
                new Distance(distance, Metrics.KILOMETERS), likedShops, pageable);
    }
}
