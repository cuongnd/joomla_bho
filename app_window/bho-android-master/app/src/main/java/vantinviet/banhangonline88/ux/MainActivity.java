/*******************************************************************************
 * Copyright (C) 2016 Business Factory, s.r.o.
 * <p/>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p/>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p/>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
package vantinviet.banhangonline88.ux;

import android.app.NotificationManager;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v4.view.MenuItemCompat;
import android.support.v4.widget.CursorAdapter;
import android.support.v4.widget.DrawerLayout;
import android.support.v4.widget.SimpleCursorAdapter;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.transition.TransitionInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.facebook.appevents.AppEventsLogger;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;

import timber.log.Timber;
import vantinviet.banhangonline88.BuildConfig;
import vantinviet.banhangonline88.CONST;
import vantinviet.banhangonline88.MyApplication;
import vantinviet.banhangonline88.R;
import vantinviet.banhangonline88.SettingsMy;
import vantinviet.banhangonline88.VTVConfig;
import vantinviet.banhangonline88.api.EndPoints;
import vantinviet.banhangonline88.api.GsonRequest;
import vantinviet.banhangonline88.api.JsonRequest;
import vantinviet.banhangonline88.entities.User;
import vantinviet.banhangonline88.entities.cart.CartInfo;
import vantinviet.banhangonline88.entities.drawerMenu.DrawerMenuItem;
import vantinviet.banhangonline88.entities.order.Order;
import vantinviet.banhangonline88.interfaces.LoginDialogInterface;
import vantinviet.banhangonline88.libraries.joomla.JFactory;
import vantinviet.banhangonline88.libraries.legacy.application.JApplication;
import vantinviet.banhangonline88.utils.Analytics;
import vantinviet.banhangonline88.utils.JsonUtils;
import vantinviet.banhangonline88.utils.MsgUtils;
import vantinviet.banhangonline88.utils.MyRegistrationIntentService;
import vantinviet.banhangonline88.utils.Utils;
import vantinviet.banhangonline88.ux.dialogs.LoginDialogFragment;
import vantinviet.banhangonline88.ux.fragments.AccountEditFragment;
import vantinviet.banhangonline88.ux.fragments.AccountFragment;
import vantinviet.banhangonline88.ux.fragments.CartFragment;
import vantinviet.banhangonline88.ux.fragments.ChattingFragment;
import vantinviet.banhangonline88.ux.fragments.MenuDrawerFragment;
import vantinviet.banhangonline88.ux.fragments.OrderCreateFragment;
import vantinviet.banhangonline88.ux.fragments.OrderFragment;
import vantinviet.banhangonline88.ux.fragments.OrdersHistoryFragment;
import vantinviet.banhangonline88.ux.fragments.PageMenuItemFragment;
import vantinviet.banhangonline88.ux.fragments.ProductFragment;
import vantinviet.banhangonline88.ux.fragments.SettingsFragment;
import vantinviet.banhangonline88.ux.fragments.WishlistFragment;

import static java.util.concurrent.TimeUnit.MINUTES;
import static java.util.concurrent.TimeUnit.SECONDS;

/**
 * Application is based on one core activity, which handles fragment operations.
 */
public class MainActivity extends AppCompatActivity implements MenuDrawerFragment.FragmentDrawerListener {

    public static final String MSG_MAIN_ACTIVITY_INSTANCE_IS_NULL = "MainActivity instance is null.";
    public static MainActivity mInstance = null;
    public static final String MyPREFERENCES = "MyPrefs" ;
    public static final String SESSION = "session";
    public static VTVConfig vtvconfig=VTVConfig.getInstance();
    /**
     * Reference tied drawer menu, represented as fragment.
     */
    public MenuDrawerFragment drawerFragment;
    /**
     * Indicate that app will be closed on next back press
     */
    private boolean isAppReadyToFinish = false;
    /**
     * Reference view showing number of products in shopping cart.
     */
    private TextView cartCountView;
    /**
     * Reference number of products in shopping cart.
     */
    private int cartCountNotificationValue = CONST.DEFAULT_EMPTY_ID;

    /**
     * BroadcastReceiver used in service for Gcm registration.
     */
    private BroadcastReceiver mRegistrationBroadcastReceiver;

    // Fields used in searchView.
    private SimpleCursorAdapter searchSuggestionsAdapter;
    private ArrayList<String> searchSuggestionsList;
    private ProgressDialog progressDialog;
    private JApplication app=JFactory.getApplication();

    /**
     * Refresh notification number of products in shopping cart.
     * Create action only if called from fragment attached to MainActivity.
     */
    public static void updateCartCountNotification() {
        MainActivity instance = MainActivity.getInstance();
        if (instance != null) {
            instance.getCartCount(false);
        } else {
            Timber.e(MSG_MAIN_ACTIVITY_INSTANCE_IS_NULL);
        }
    }

    /**
     * Update actionBar title.
     * Create action only if called from fragment attached to MainActivity.
     */
    public static void setActionBarTitle(String title) {
        MainActivity instance = MainActivity.getInstance();
        if (instance != null) {
            // TODO want different toolbar text font?
//            SpannableString s = new SpannableString(title);
//            s.setSpan(new TypefaceSpan("sans-serif-light"), 0, s.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
//            instance.setTitle(s);
            instance.setTitle(title);
        } else {
            Timber.e(MSG_MAIN_ACTIVITY_INSTANCE_IS_NULL);
        }
    }

    /**
     * Method checks if MainActivity instance exist. If so, then drawer menu header will be invalidated.
     */
    public static void invalidateDrawerMenuHeader() {
        MainActivity instance = MainActivity.getInstance();
        if (instance != null && instance.drawerFragment != null) {
            instance.drawerFragment.invalidateHeader();
        } else {
            Timber.e(MSG_MAIN_ACTIVITY_INSTANCE_IS_NULL);
        }
    }

    // Add app running notification


    // Remove notification
    private void removeNotification() {
        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        
        manager.cancel(12);
    }


    private final ScheduledExecutorService scheduler =
            Executors.newScheduledThreadPool(1);
    public void beepForAnHour() {
        final Runnable beeper = new Runnable() {
            public void run() {
            System.out.println("action update");
                MyApplication.getInstance().getNotification();



            }
        };
        final ScheduledFuture<?> beeperHandle =
                scheduler.scheduleAtFixedRate(beeper, 10, 5, SECONDS);
        scheduler.schedule(new Runnable() {
            public void run() { beeperHandle.cancel(true); }
        }, 60*60, MINUTES);
    }


    /**
     * Return MainActivity instance. Null if activity doesn't exist.
     *
     * @return activity instance.
     */
    private static synchronized MainActivity getInstance() {
        return mInstance;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //check_user();
        mInstance = this;
        init(mInstance);



    }
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        System.out.println("ratator");
    }

    private void init(MainActivity mInstance) {
        Timber.d("%s onCreate", MainActivity.class.getSimpleName());
        app.setCurrentActivity(mInstance);

        // init loading dialog
        progressDialog = Utils.generateProgressDialog(this, false);
        app.setProgressDialog(progressDialog);
        app.setResources(getResources());
        // Set app specific language localization by selected shop.
        String lang = SettingsMy.getActualNonNullShop(this).getLanguage();
        if(lang==null){
            lang="en_GB";
        }
        System.out.println(lang);
        MyApplication.setAppLocale(lang);
        //beepForAnHour();
        setContentView(R.layout.activity_main);
        // Initialize trackers and fbLogger
        Analytics.prepareTrackersAndFbLogger(SettingsMy.getActualNonNullShop(this), getApplicationContext());

        // Prepare toolbar and navigation drawer
        Toolbar toolbar = (Toolbar) findViewById(R.id.main_toolbar);
        setSupportActionBar(toolbar);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayShowHomeEnabled(true);
        } else {
            Timber.e(new RuntimeException(), "GetSupportActionBar returned null.");
        }
        drawerFragment = (MenuDrawerFragment) getSupportFragmentManager().findFragmentById(R.id.main_navigation_drawer_fragment);
        drawerFragment.setUp((DrawerLayout) findViewById(R.id.main_drawer_layout), toolbar, this);
        app.main_linear_layout =(LinearLayout) findViewById(R.id.main_linear_layout);
        app.root_relative_layout =(RelativeLayout) findViewById(R.id.root_relative_layout);
        // Initialize list for search suggestions
        searchSuggestionsList = new ArrayList<>();

        // GCM registration //
        mRegistrationBroadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                boolean sentToken = SettingsMy.getTokenSentToServer();
                if (sentToken) {
                    Timber.d("Gcm registration success.");
                } else {
                    Timber.e("Gcm registration failed. Device isn't registered on server.");
                }
            }
        };
        //registerGcmOnServer();
        // end of GCM registration //

        addInitialFragment();
        app.execute();

    }

    /**
     * Run service for Gcm token generation and registering device on servers.
     * Registration is needed for notification messages.
     */
    public void registerGcmOnServer() {
        if (Utils.checkPlayServices(this)) {
            Intent intent = new Intent(this, MyRegistrationIntentService.class);
            startService(intent);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);

        // Prepare search view
        MenuItem searchItem = menu.findItem(R.id.action_search);


        // Prepare cart count info
        MenuItem cartItem = menu.findItem(R.id.action_cart);
        MenuItemCompat.setActionView(cartItem, R.layout.action_icon_shopping_cart);
        View view = MenuItemCompat.getActionView(cartItem);
        cartCountView = (TextView) view.findViewById(R.id.shopping_cart_notify);
        showNotifyCount(cartCountNotificationValue);
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onCartSelected();
            }
        });
        if (cartCountNotificationValue == CONST.DEFAULT_EMPTY_ID) {
            // If first cart count check, then sync server cart data.
            getCartCount(true);
        }
        return super.onCreateOptionsMenu(menu);
    }

    /**
     * Loads cart count from server.
     *
     * @param initialize if true, then server run cart synchronization . Useful during app starts.
     */
    private void getCartCount(boolean initialize) {
        Timber.d("Obtaining cart count.");
        if (cartCountView != null) {
            User user = SettingsMy.getActiveUser();
            if (user == null) {
                Timber.d("Cannot update notify count. User is logged out.");
                showNotifyCount(0);
            } else {
                // If cart count is loaded for the first time, we need to load whole cart because of synchronization.
                if (initialize) {
                    String url = String.format(EndPoints.CART, SettingsMy.getActualNonNullShop(this).getId());
                    JsonRequest req = new JsonRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            Timber.d("getCartCount: %s", response.toString());
                            try {
                                showNotifyCount(response.getInt(JsonUtils.TAG_PRODUCT_COUNT));
                            } catch (Exception e) {
                                Timber.e(e, "Obtain cart count from response failed.");
                                showNotifyCount(0);
                            }
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            MsgUtils.logErrorMessage(error);
                            showNotifyCount(0);
                        }
                    }, getSupportFragmentManager(), user.getAccessToken());
                    req.setRetryPolicy(MyApplication.getDefaultRetryPolice());
                    req.setShouldCache(false);
                    MyApplication.getInstance().addToRequestQueue(req, CONST.MAIN_ACTIVITY_REQUESTS_TAG);
                } else {
                    String url = String.format(EndPoints.CART_INFO, SettingsMy.getActualNonNullShop(this).getId());
                    GsonRequest<CartInfo> req = new GsonRequest<>(Request.Method.GET, url, null, CartInfo.class, new Response.Listener<CartInfo>() {
                        @Override
                        public void onResponse(CartInfo response) {
                            Timber.d("getCartCount: %s", response.toString());
                            showNotifyCount(response.getProductCount());
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            MsgUtils.logErrorMessage(error);
                            showNotifyCount(0);
                        }
                    }, getSupportFragmentManager(), user.getAccessToken());
                    req.setRetryPolicy(MyApplication.getDefaultRetryPolice());
                    req.setShouldCache(false);
                    MyApplication.getInstance().addToRequestQueue(req, CONST.MAIN_ACTIVITY_REQUESTS_TAG);
                }
            }
        }
    }

    /**
     * Method display cart count notification. Cart count notification remains hide if cart count is negative number.
     *
     * @param newCartCount cart count to show.
     */
    private void showNotifyCount(int newCartCount) {
        cartCountNotificationValue = newCartCount;
        Timber.d("Update cart count notification: %d", cartCountNotificationValue);
        if (cartCountView != null) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (cartCountNotificationValue != 0 && cartCountNotificationValue != CONST.DEFAULT_EMPTY_ID) {
                        cartCountView.setText(getString(R.string.format_number, cartCountNotificationValue));
                        cartCountView.setVisibility(View.VISIBLE);
                    } else {
                        cartCountView.setVisibility(View.GONE);
                    }
                }
            });
        } else {
            Timber.e("Cannot update cart count notification. Cart count view is null.");
        }
    }





    @Override
    public void prepareSearchSuggestions(List<DrawerMenuItem> navigation) {
        final String[] from = new String[]{"categories"};
        final int[] to = new int[]{android.R.id.text1};

        searchSuggestionsAdapter = new SimpleCursorAdapter(this, android.R.layout.simple_list_item_1,
                null, from, to, CursorAdapter.FLAG_REGISTER_CONTENT_OBSERVER);
        if (navigation != null && !navigation.isEmpty()) {
            for (int i = 0; i < navigation.size(); i++) {
                if (!searchSuggestionsList.contains(navigation.get(i).getName())) {
                    searchSuggestionsList.add(navigation.get(i).getName());
                }

                if (navigation.get(i).hasChildren()) {
                    for (int j = 0; j < navigation.get(i).getChildren().size(); j++) {
                        if (!searchSuggestionsList.contains(navigation.get(i).getChildren().get(j).getName())) {
                            searchSuggestionsList.add(navigation.get(i).getChildren().get(j).getName());
                        }
                    }
                }
            }
            searchSuggestionsAdapter.notifyDataSetChanged();
        } else {
            Timber.e("Search suggestions loading failed.");
            searchSuggestionsAdapter = null;
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_wish_list) {
            onWishlistSelected();
            return true;
        } else if (id == R.id.action_cart) {
            onCartSelected();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    /**
     * Add first fragment to the activity. This fragment will be attached to the bottom of the fragments stack.
     * When fragment stack is cleared {@link #clearBackStack}, this fragment will be shown.
     */
    private void addInitialFragment() {
        FragmentManager frgManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = frgManager.beginTransaction();
        frgManager.executePendingTransactions();
    }

    /**
     * Method creates fragment transaction and replace current fragment with new one.
     *
     * @param newFragment    new fragment used for replacement.
     * @param transactionTag text identifying fragment transaction.
     */
    private void replaceFragment(Fragment newFragment, String transactionTag) {
        if (newFragment != null) {
            FragmentManager frgManager = getSupportFragmentManager();
            FragmentTransaction fragmentTransaction = frgManager.beginTransaction();
            fragmentTransaction.setAllowOptimization(false);
            fragmentTransaction.addToBackStack(transactionTag);
            fragmentTransaction.replace(R.id.main_content_frame, newFragment).commit();
            frgManager.executePendingTransactions();
        } else {
            Timber.e(new RuntimeException(), "Replace fragments with null newFragment parameter.");
        }
    }

    /**
     * Method clear fragment backStack (back history). On bottom of stack will remain Fragment added by {@link #addInitialFragment()}.
     */
    private void clearBackStack() {
        Timber.d("Clearing backStack");
        FragmentManager manager = getSupportFragmentManager();
        if (manager.getBackStackEntryCount() > 0) {
            if (BuildConfig.DEBUG) {
                for (int i = 0; i < manager.getBackStackEntryCount(); i++) {
                    Timber.d("BackStack content_%d= id: %d, name: %s", i, manager.getBackStackEntryAt(i).getId(), manager.getBackStackEntryAt(i).getName());
                }
            }
            FragmentManager.BackStackEntry first = manager.getBackStackEntryAt(0);
            manager.popBackStackImmediate(first.getId(), FragmentManager.POP_BACK_STACK_INCLUSIVE);
        }
        Timber.d("backStack cleared.");
//        TODO maybe implement own fragment backStack handling to prevent banner fragment recreation during clearing.
//        http://stackoverflow.com/questions/12529499/problems-with-android-fragment-back-stack
    }




    @Override
    public void onDrawerMenuItemSelected(DrawerMenuItem drawerMenuItem) {
        Timber.d("drawerMenuItem %s",drawerMenuItem.toString());
        clearBackStack();
        String link=drawerMenuItem.getLink();
        if(link==null || link==""){
            link=vtvconfig.getRootUrl()+"?";
        }
        link=app.get_page_config_app(link);
        app.setRedirect(link);
        Fragment fragment = PageMenuItemFragment.newInstance(drawerMenuItem);
        replaceFragment(fragment, PageMenuItemFragment.class.getSimpleName());
    }


    @Override
    public void onAccountSelected() {
        AccountFragment fragment = new AccountFragment();
        replaceFragment(fragment, AccountFragment.class.getSimpleName());
    }
    @Override
    public void onChattingSelected(long userId){
        clearBackStack();
        ChattingFragment fragment = ChattingFragment.newInstance(userId);
        replaceFragment(fragment, ChattingFragment.class.getSimpleName());
    }


    /**
     * Launch {@link ProductFragment}.
     *
     * @param productId id of product for display.
     */
    public void onProductSelected(long productId) {
        Fragment fragment = ProductFragment.newInstance(productId);
        if (android.os.Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP) {
            fragment.setReturnTransition(TransitionInflater.from(this).inflateTransition(android.R.transition.fade));
        }
        replaceFragment(fragment, ProductFragment.class.getSimpleName());
    }

    /**
     * Launch {@link SettingsFragment}.
     */
    public void startSettingsFragment() {
        Fragment fragment = new SettingsFragment();
        replaceFragment(fragment, SettingsFragment.class.getSimpleName());
    }

    /**
     * If user is logged in then {@link CartFragment} is launched . Otherwise is showed a login dialog.
     */
    public void onCartSelected() {
        launchUserSpecificFragment(new CartFragment(), CartFragment.class.getSimpleName(), new LoginDialogInterface() {
            @Override
            public void successfulLoginOrRegistration(User user) {
                // If login was successful launch CartFragment.
                onCartSelected();
            }
        });
    }

    /**
     * If user is logged in then {@link WishlistFragment} is launched . Otherwise is showed a login dialog.
     */
    public void onWishlistSelected() {
        launchUserSpecificFragment(new WishlistFragment(), WishlistFragment.class.getSimpleName(), new LoginDialogInterface() {
            @Override
            public void successfulLoginOrRegistration(User user) {
                // If login was successful launch WishlistFragment.
                onWishlistSelected();
            }
        });
    }

    /**
     * If user is logged in then {@link OrderCreateFragment} is launched . Otherwise is showed a login dialog.
     */
    public void onOrderCreateSelected() {
        launchUserSpecificFragment(new OrderCreateFragment(), OrderCreateFragment.class.getSimpleName(), new LoginDialogInterface() {
            @Override
            public void successfulLoginOrRegistration(User user) {
                // If login was successful launch CartFragment.
                onCartSelected();
            }
        });
    }

    /**
     * If user is logged in then {@link AccountEditFragment} is launched . Otherwise is showed a login dialog.
     */
    public void onAccountEditSelected() {
        launchUserSpecificFragment(new AccountEditFragment(), AccountEditFragment.class.getSimpleName(), new LoginDialogInterface() {
            @Override
            public void successfulLoginOrRegistration(User user) {
                // If login was successful launch AccountEditFragment.
                onAccountEditSelected();
            }
        });
    }

    /**
     * If user is logged in then {@link OrdersHistoryFragment} is launched . Otherwise is showed a login dialog.
     */
    public void onOrdersHistory() {
        launchUserSpecificFragment(new OrdersHistoryFragment(), OrdersHistoryFragment.class.getSimpleName(), new LoginDialogInterface() {
            @Override
            public void successfulLoginOrRegistration(User user) {
                // If login was successful launch orderHistoryFragment.
                onOrdersHistory();
            }
        });
    }

    /**
     * Check if user is logged in. If so then start defined fragment, otherwise show login dialog.
     *
     * @param fragment       fragment to launch.
     * @param transactionTag text identifying fragment transaction.
     * @param loginListener  listener on successful login.
     */
    private void launchUserSpecificFragment(Fragment fragment, String transactionTag, LoginDialogInterface loginListener) {
        if (SettingsMy.getActiveUser() != null) {
            replaceFragment(fragment, transactionTag);
        } else {
            DialogFragment loginDialogFragment = LoginDialogFragment.newInstance(loginListener);
            loginDialogFragment.show(getSupportFragmentManager(), LoginDialogFragment.class.getSimpleName());
        }
    }

    /**
     * Launch {@link OrderFragment}.
     *
     * @param order order to show
     */
    public void onOrderSelected(Order order) {
        if (order != null) {
            Fragment fragment = OrderFragment.newInstance(order.getId());
            replaceFragment(fragment, OrderFragment.class.getSimpleName());
        } else {
            Timber.e("Creating order detail with null data.");
        }
    }

    @Override
    public void onBackPressed() {
        // If back button pressed, try close drawer if exist and is open. If drawer is already closed continue.
        if (drawerFragment == null || !drawerFragment.onBackHide()) {
            // If app should be finished or some fragment transaction still remains on backStack, let the system do the job.
            if (getSupportFragmentManager().getBackStackEntryCount() > 0 || isAppReadyToFinish)
                super.onBackPressed();
            else {
                // BackStack is empty. For closing the app user have to tap the back button two times in two seconds.
                MsgUtils.showToast(this, MsgUtils.TOAST_TYPE_MESSAGE, getString(R.string.Another_click_for_leaving_app), MsgUtils.ToastLength.SHORT);
                isAppReadyToFinish = true;
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        isAppReadyToFinish = false;
                    }
                }, 2000);
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        // FB base events logging
        AppEventsLogger.activateApp(this);

        // GCM registration
        LocalBroadcastManager.getInstance(this).registerReceiver(mRegistrationBroadcastReceiver,
                new IntentFilter(SettingsMy.REGISTRATION_COMPLETE));
    }

    @Override
    protected void onPause() {
        super.onPause();
        // FB base events logging
        AppEventsLogger.deactivateApp(this);
        MyApplication.getInstance().cancelPendingRequests(CONST.MAIN_ACTIVITY_REQUESTS_TAG);

        // GCM registration
        LocalBroadcastManager.getInstance(this).unregisterReceiver(mRegistrationBroadcastReceiver);
    }
}
