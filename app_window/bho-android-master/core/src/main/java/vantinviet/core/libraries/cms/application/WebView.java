package vantinviet.core.libraries.cms.application;

import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.support.annotation.RequiresApi;
import android.util.Base64;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.google.gson.stream.JsonReader;

import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

import pl.droidsonroids.gif.GifImageView;
import timber.log.Timber;
import vantinviet.core.R;
import vantinviet.core.VTVConfig;
import vantinviet.core.configuration.JConfig;


import vantinviet.core.libraries.joomla.JFactory;
import vantinviet.core.libraries.legacy.application.JApplication;
import vantinviet.core.libraries.utilities.JUtilities;

import static android.view.ViewGroup.LayoutParams.MATCH_PARENT;


/**
 * Created by cuongnd on 12/17/2015.
 */
public class WebView {
    private static JApplication app=JFactory.getApplication();
    private static WebView ourInstance;
    private Class<?> current_class;
    SharedPreferences sharedpreferences;
    String link;
    private static VTVConfig vtv_config=VTVConfig.getInstance();
    int caching = JConfig.getInstance().caching;
    public static WebView getInstance() {
        if (ourInstance == null) {
            ourInstance = new WebView();
        }
        return ourInstance;
    }
    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    public void create_browser(String link, Map<String, String> data_post) {
        vtv_WebView web_browser = JFactory.getWebBrowser();
        if(data_post!=null){
            web_browser.vtv_postUrl(link,data_post);
        }else {
            web_browser.vtv_postUrl(link);
        }

        web_browser.addJavascriptInterface(new MyJavaScriptInterfaceWebsite(), "HtmlViewer");


    }

    public void go_to_page(String html){
        final String[] html1 = {html};
        Handler refresh2 = new Handler(Looper.getMainLooper());
        refresh2.post(new Runnable() {
            public void run()
            {
                byte[] data= Base64.decode(html1[0], Base64.DEFAULT);
                // create alert dialog
                try {

                    html1[0] =new String(data, "UTF-8");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();

                    return;
                }
                //Timber.d("html response: %s", html1[0]);
                Gson gson = new Gson();
                JsonReader reader = new JsonReader(new StringReader(html1[0]));
                reader.setLenient(true);
                Page page=null;
                try {
                    page = gson.fromJson(reader, Page.class);
                }
                catch (JsonParseException e) {
                    Timber.d("JsonParseException error : %s",e.toString());

                    JUtilities.show_alert_dialog(app.getLink_redirect());
                    return;
                }

                app.setAplication(page);

                //System.out.print("Page -------------response: "+page.toString());
               // System.out.print("list_input response: "+page.getList_input().toString());

                String template_name=app.getTemplate().getTemplateName();
                //Timber.d("modules: %s",app.getModules().toString());
                //Timber.d("template: %s",template_name);
                try {
                    Class<?> template_class = null;
                    template_class = Class.forName(String.format("vantinviet.core.templates.%s.index",template_name));
                    Method method = template_class.getDeclaredMethod("buildLayout",LinearLayout.class);
                    method.invoke(template_class,app.getRoot_linear_layout());
                    //GifImageView gif_image_view=(GifImageView)app.getCurrentActivity().findViewById(R.id.bg);

                    app.getRoot_linear_layout().setBackgroundColor(Color.parseColor("#FFFFFF"));
                    //bg.setVisibility(LinearLayout.GONE);
                } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.getCause().printStackTrace();
                }
                app.getCurrentActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        app.getProgressDialog().dismiss();
                    }
                });




            }
        });


    }
    private class MyJavaScriptInterfaceWebsite {

        public MyJavaScriptInterfaceWebsite() {
        }

        @JavascriptInterface
        public void showHTML(String html) {
            //Timber.d("html response: %s",html);
            if(vtv_config.getCaching()==1) {
                SharedPreferences.Editor editor = app.getWebcache_sharedpreferences().edit();
                link=app.getLink_redirect();
                editor.putString(link, html);
                editor.commit();
            }
            go_to_page(html);

        }

    }


}
