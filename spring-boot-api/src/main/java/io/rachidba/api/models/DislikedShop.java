package io.rachidba.api.models;

public class DislikedShop {
    // The Date that user disliked the shop: Timestamp
    private long dislikDate;
    private String shopId;

    public DislikedShop(long dislikeDate, String shopId) {
        this.dislikDate = dislikeDate;
        this.shopId = shopId;
    }

    public long getDislikDate() {
        return dislikDate;
    }

    public String getShopId() {
        return shopId;
    }

    public void setDislikDate(long dislikeDate) {
        this.dislikDate = dislikeDate;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }
}
