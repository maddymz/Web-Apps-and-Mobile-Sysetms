package asu.lab6.battleship;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class WebViewActivity extends AppCompatActivity {
    WebView mWebView;
    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);

        final String userName = getIntent().getStringExtra("userName");
        Log.v("intent val",userName);
        mWebView = findViewById(R.id.web_view);
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.setHorizontalScrollBarEnabled(true);
        mWebView.setWebContentsDebuggingEnabled(true);
        mWebView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        mWebView.getSettings().setDomStorageEnabled(true);

        mWebView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(mWebView, url);
                Toast.makeText(getApplicationContext(), "welcomeUser called!", Toast.LENGTH_SHORT).show();
                mWebView.evaluateJavascript("welcomeUser(\""+ userName+"\")", null);
            }
        });

        mWebView.addJavascriptInterface(new WebInterface(this.getApplicationContext()), "Android");
        mWebView.loadUrl("file:///android_asset/index.html");

    }

    public boolean onKeyDown(int keyCode, KeyEvent event, WebView myWebview){
        if((keyCode == KeyEvent.KEYCODE_BACK) && myWebview.canGoBack()){
            myWebview.goBack();
            return true;

        }
        return super.onKeyDown(keyCode, event);
    }


}

class WebInterface {
    private Context mContext;

    WebInterface(Context c){
        mContext = c;
    }


    @JavascriptInterface
    public void done(String value, String user){
        Log.v("value after win or loss", value);
        Intent endGameIntent = new Intent(mContext, GameEndActivity.class);
        endGameIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if(value.equals("lost")){
            endGameIntent.putExtra("gameVal", value);
            endGameIntent.putExtra("user", user);
            Log.v("inside lost", "lost");
            Toast.makeText(mContext, "done method called!", Toast.LENGTH_SHORT).show();
            mContext.startActivity(endGameIntent);
        }else {
            endGameIntent.putExtra("gameVal", value);
            endGameIntent.putExtra("user", user);
            mContext.startActivity(endGameIntent);
        }
    }

    @JavascriptInterface
    public void restart(){
        Intent intent = new Intent(mContext, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(intent);
    }

}
