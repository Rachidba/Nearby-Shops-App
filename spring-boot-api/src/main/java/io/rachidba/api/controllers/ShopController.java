package io.rachidba.api.controllers;

import io.rachidba.api.repositories.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ShopController {

    @Autowired
    ShopRepository shopRepository;

}
