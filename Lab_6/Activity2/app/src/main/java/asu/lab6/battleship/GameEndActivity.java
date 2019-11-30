package asu.lab6.battleship;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class GameEndActivity extends AppCompatActivity {
    TextView mTextView;
    Button mQuitButton;
    Button mResumeButton;

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gameend);
        final String gameValue = getIntent().getStringExtra("gameVal");
        final String userName = getIntent().getStringExtra("user");
        Log.v("intent  end game ", gameValue);
        mTextView = findViewById(R.id.endGame_textView);
        String endMsg = "Player" + " " + userName + " " + "has" + " " + gameValue;
        mTextView.setText(endMsg);

        mResumeButton = findViewById(R.id.resume_button);
        mQuitButton = findViewById(R.id.quit_button);
        mQuitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent quitIntent = new Intent(GameEndActivity.this, MainActivity.class);
                startActivity(quitIntent);
                Toast.makeText(getApplicationContext(), "quit button clicked!", Toast.LENGTH_SHORT).show();
            }
        });

        mResumeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent resumeIntent = new Intent(GameEndActivity.this, WebViewActivity.class);
                resumeIntent.putExtra("userName", userName);
                startActivity(resumeIntent);
            }
        });

    }
}
