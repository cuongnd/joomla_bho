package vantinviet.banhangonline88.entities.module;

/**
 * Created by cuongnd on 25/03/2017.
 */

class Params {
    String layout;
    boolean cache;
    int cache_time;
    String module_image;
    String module_image_tip;
    boolean lazyload;
    @Override
    public String toString() {
        return "Params{" +
                ", layout='" + layout + '\'' +
                ", cache='" + cache + '\'' +
                ", cache_time='" + cache_time + '\'' +
                ", module_image='" + module_image + '\'' +
                ", module_image_tip='" + module_image_tip + '\'' +
                ", lazyload='" + lazyload + '\'' +
                '}';
    }
}
