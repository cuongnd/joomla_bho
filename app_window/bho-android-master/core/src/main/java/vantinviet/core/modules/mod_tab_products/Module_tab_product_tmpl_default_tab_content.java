package vantinviet.core.modules.mod_tab_products;

import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import timber.log.Timber;
import vantinviet.core.R;
import vantinviet.core.VTVConfig;
import vantinviet.core.administrator.components.com_hikashop.classes.Category;
import vantinviet.core.administrator.components.com_hikashop.classes.Product;
import vantinviet.core.libraries.cms.application.Page;
import vantinviet.core.libraries.cms.application.vtv_WebView;
import vantinviet.core.libraries.cms.menu.JMenu;
import vantinviet.core.libraries.html.module.Module;
import vantinviet.core.libraries.joomla.JFactory;
import vantinviet.core.libraries.legacy.application.JApplication;
import vantinviet.core.libraries.utilities.JUtilities;

/**
 * Created by neokree on 16/12/14.
 */

/**
 * Created by neokree on 16/12/14.
 */
public class Module_tab_product_tmpl_default_tab_content extends Fragment {
    public Mod_tab_product_helper.List_category_product list_category_product;
    private ArrayList<Product> list_product=new ArrayList<Product>();
    public  View view;
    public boolean is_loaded=false;
    private JApplication app=JFactory.getApplication();
    public Module module;

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        this.view = inflater.inflate(R.layout.modules_mod_tab_products_tmpl_default_tab_content, container, false);

        if(list_category_product.getIs_loaded()==1) {
            build_layout();
        }else {
            Timber.d("hello Request_ajax");
            Timber.d("list_category_product %s",list_category_product.toString());
            vtv_WebView web_browser = JFactory.getWebBrowser();
            web_browser_setup(web_browser);
            app.getProgressDialog().show();
            web_browser.addJavascriptInterface(new ajax_list_category_product(), "HtmlViewer");
        }

        return view;
    }

    private void build_layout() {
        Show_product_recycler_view show_product_recycler_view=new Show_product_recycler_view(list_category_product);
        RecyclerView product_recycler_view = (RecyclerView) view.findViewById(R.id.product_recycler_view);
        product_recycler_view.setHasFixedSize(true);
        RecyclerViewDataAdapter adapter = new RecyclerViewDataAdapter(getContext(), show_product_recycler_view);
        product_recycler_view.setLayoutManager(new LinearLayoutManager(getContext(), LinearLayoutManager.VERTICAL, false));
        product_recycler_view.setAdapter(adapter);

        RecyclerView cagory_recycler_view = (RecyclerView) view.findViewById(R.id.category_recycler_view);
        cagory_recycler_view.setHasFixedSize(true);
        ArrayList<Category> list_category= new ArrayList<Category>();;
        try{
            list_category = list_category_product.getList_sub_category_detail();
        }catch (Exception ex){
            Timber.d("ex %s",ex.toString());
        }
        CategoryListDataAdapter category_adapter = new CategoryListDataAdapter(getContext(), list_category);
        cagory_recycler_view.setLayoutManager(new LinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false));
        cagory_recycler_view.setAdapter(category_adapter);
    }


    public void init() {
        Timber.d("hello 1224 ");
    }
    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private void web_browser_setup(vtv_WebView web_browser) {
        Category category=list_category_product.getDetail();
        Map<String, String> post = new HashMap<String, String>();
        JMenu menu = JFactory.getMenu();
        int active_menu_item_id = menu.getMenuactive().getId();
        post.put("option", "com_modules");
        post.put("task", "module.app_ajax_render_module");
        post.put("module_id",String.valueOf(module.getId()));
        post.put("category_id",String.valueOf(category.getCategory_id()));
        Params params=new Params();
        ObjectMapper mapper = new ObjectMapper();
        String paramsjsonInString="";
        try {
            paramsjsonInString = mapper.writeValueAsString(params);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        post.put("params",paramsjsonInString);
        post.put(app.getSession().getFormToken(), "1");
        post.put("tmpl", "component");
        post.put("Itemid", String.valueOf(active_menu_item_id));
        web_browser.vtv_postUrl(VTVConfig.rootUrl, post);
    }

    private class Params {
        String layout="_:products.app";
        ClassParent parent=new ClassParent();

        private class ClassParent {
            String sub1="sub1";
            String sub2="sub2";
        }
    }

    public class Show_product_recycler_view {
        private final Mod_tab_product_helper.List_category_product list_category_product;
        Category category;
        ArrayList<Product> list_product;
        public Show_product_recycler_view(Mod_tab_product_helper.List_category_product list_category_product) {
            this.list_category_product=list_category_product;
            try{
                category =list_category_product.getDetail();
            }catch (Exception ex){
                Timber.d("ex %s",ex.toString());
            }
            try{
                list_product=list_category_product.getList();
            }catch (Exception ex){
                Timber.d("ex %s",ex.toString());
            }


        }

        public ArrayList<Product> getList_product() {
            return list_product;
        }

        public Category getCategory() {
            return category;
        }
    }
    private class ajax_list_category_product {
        public ajax_list_category_product() {
        }

        @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
        @JavascriptInterface
        public void showHTML(String html) {
            html= JUtilities.get_string_by_string_base64(html);
            Page page = JUtilities.getGsonParser().fromJson(html, Page.class);
            String component_content=page.getComponent_response();

            ArrayList<Mod_tab_product_helper.List_category_product> list_main_category_product_current_tab;
            Type listType = new TypeToken<ArrayList<Mod_tab_product_helper.List_category_product>>() {}.getType();
            list_main_category_product_current_tab = JUtilities.getGsonParser().fromJson(component_content, listType);
            //Category category_detail = list_category_product.getDetail();
            //list_main_category_product.set(Position,list_main_category_product_current_tab.get(0));
            //list_main_category_product.get(Position).setDetail(category_detail);
            //Timber.d("html response ajax_get_list_category_product %s",list_main_category_product_current_tab.toString());
            list_category_product=list_main_category_product_current_tab.get(0);
            app.getCurrentActivity().runOnUiThread(new Runnable()
            {
                public void run()
                {
                    build_layout();

                }

            });
            app.getProgressDialog().dismiss();
        }

    }

}
