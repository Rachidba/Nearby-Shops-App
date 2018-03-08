package io.rachidba.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection="users")
public class ApplicationUser {
    @Id
    private String id;
    //user email
    @Indexed(unique = true)
    private String username;
    private String password;
    // Liked shops: List that contains the IDs of liked shops
    private List<String> likedShops = new ArrayList<>();
    // Disliked shops
    private List<DislikedShop> dislikedShops = new ArrayList<>();

    public ApplicationUser() {
        super();
    }

    public ApplicationUser(String username, String password) {
        this.username = username;
        this.password = password;
        this.likedShops = new ArrayList<>();
    }

    public ApplicationUser(String id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.likedShops = new ArrayList<>();
    }

    public ApplicationUser(String id, String username, String password, List<String> likedShops, List<DislikedShop> dislikedShops) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.likedShops = likedShops;
        this.dislikedShops = dislikedShops;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public List<String> getLikedShops() {
        return likedShops;
    }

    public List<DislikedShop> getDislikedShops() {
        return dislikedShops;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String email) {
        this.username = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setLikedShops(List<String> likedShops) {
        this.likedShops = likedShops;
    }

    public void setDislikedShops(List<DislikedShop> dislikedShops) {
        this.dislikedShops = dislikedShops;
    }
}

