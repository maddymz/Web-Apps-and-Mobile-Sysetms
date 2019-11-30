package asu.lab6.battleship;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {
    Button mSubmitButton;
    EditText mEditText;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mSubmitButton = findViewById(R.id.input_button);
        mEditText = findViewById(R.id.input_user_name);
        mSubmitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String userInputValue = mEditText.getText().toString();
                Log.v("userInput", userInputValue);
                Intent intent = new Intent(MainActivity.this, WebViewActivity.class);
                intent.putExtra("userName", userInputValue);
                startActivity(intent);
            }
        });

    }
}
