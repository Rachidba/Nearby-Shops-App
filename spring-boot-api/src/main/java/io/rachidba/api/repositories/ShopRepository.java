package io.rachidba.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import io.rachidba.api.models.Shop;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;

@Repository
public interface ShopRepository extends MongoRepository<Shop, String> {
    Page<Shop> findByLocationNear(Point location, Distance distance, Pageable pageable);
}

