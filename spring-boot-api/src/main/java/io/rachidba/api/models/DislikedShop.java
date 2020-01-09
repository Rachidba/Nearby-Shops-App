package io.rachidba.api.models;

public class DislikedShop implements Comparable<DislikedShop> {
    private long dislikeDate;
    private String shopId;

    public DislikedShop(long dislikeDate, String shopId) {
        this.dislikeDate = dislikeDate;
        this.shopId = shopId;
    }

    public long getDislikeDate() {
        return dislikeDate;
    }

    public String getShopId() {
        return shopId;
    }

    public void setDislikeDate(long dislikeDate) {
        this.dislikeDate = dislikeDate;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }

    @Override
    public int compareTo(DislikedShop o) {
        return this.shopId.compareTo(o.shopId);
    }
}
