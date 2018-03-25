package io.rachidba.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import io.rachidba.api.models.Shop;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends MongoRepository<Shop, String> {
    Page<Shop> findByLocationNearAndIdNotIn(Point location, Distance distance, List<String> ids, Pageable pageable);
    Page<Shop> findByLocationNearAndIdIn(Point location, Distance distance, List<String> ids, Pageable pageable);
}