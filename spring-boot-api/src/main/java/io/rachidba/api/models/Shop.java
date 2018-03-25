package io.rachidba.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="shops")
public class Shop {
    @Id
    private String id;
    private String picture;
    private String name;
    private String email;
    private String city;
    private GeoJsonPoint location;

    public Shop() {
        super();
    }

    public Shop(String picture, String name, String email, String city) {
        this.picture = picture;
        this.name = name;
        this.email = email;
        this.city = city;
    }

    public String getId() {
        return id;
    }

    public String getPicture() {
        return picture;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCity() {
        return city;
    }

    public void setId(String id) {
        this.id = id;
    }

    public GeoJsonPoint getLocation() {
        return location;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setLocation(GeoJsonPoint location) {
        this.location = location;
    }
}