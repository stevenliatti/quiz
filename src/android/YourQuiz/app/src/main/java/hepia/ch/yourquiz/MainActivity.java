package hepia.ch.yourquiz;

import android.app.Fragment;
import android.app.FragmentManager;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.Gravity;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import hepia.ch.yourquiz.fragments.LoginFragment;
import hepia.ch.yourquiz.fragments.MyParticipationsFragment;
import hepia.ch.yourquiz.fragments.MyQuizzesFragment;
import hepia.ch.yourquiz.fragments.QuizListFragment;
import hepia.ch.yourquiz.manager.CurrentUser;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    private NavigationView navigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

//        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
//        fab.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG).setAction("Action", null).show();
//            }
//        });

        DrawerLayout drawer = findViewById(R.id.app_nav_drawer);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        drawer.openDrawer(Gravity.START);
        toggle.syncState();

        navigationView = findViewById(R.id.app_nav_view);
        navigationView.setNavigationItemSelectedListener(this);

//        Button participateButton = findViewById(R.id.participate_button);
//        participateButton.setOnClickListener(new View.OnClickListener() {
//            public void onClick(View v) {
//                Intent intent = new Intent(v.getContext(), ParticipateQuizActivity.class);
//                startActivity(intent);
//            }
//        });

        // to display logo in the action bar
        if (getSupportActionBar() == null) {
            setTitle(R.string.app_name);
        } else {
            getSupportActionBar().setDisplayShowHomeEnabled(true);
            getSupportActionBar().setLogo(R.mipmap.ic_launcher_round);
            getSupportActionBar().setDisplayUseLogoEnabled(true);
        }
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = findViewById(R.id.app_nav_drawer);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.app_option, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_about) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();
        FragmentManager fragmentManager = getFragmentManager();
        Fragment newFragment = null;
        switch (id) {
            case R.id.nav_home:
                newFragment = new QuizListFragment();
                break;
            case R.id.nav_login:
                if (CurrentUser.isConnected()) {
                    CurrentUser.setIsConnected(false);
                    item.setTitle("Se connecter");
                    item.setChecked(false);
                    changeNavMenuState();
                    newFragment = new QuizListFragment();
                } else {
                    newFragment = new LoginFragment();
                }
                break;
            case R.id.nav_ranking:
//                newFragment = new RankingFragment();
                Intent intent = new Intent(this, RankingActivity.class);
//                intent.putExtra(RankingActivity.QUIZ_EXTRA, bundle);
                startActivity(intent);
                break;
            case R.id.nav_myQuizzes:
                newFragment = new MyQuizzesFragment();
                break;
            case R.id.nav_myParticipations:
                newFragment = new MyParticipationsFragment();
                break;
            default:
                return false;
        }
        if (newFragment != null) {
            fragmentManager.beginTransaction().replace(R.id.content_frame, newFragment).commit();
            DrawerLayout drawer = findViewById(R.id.app_nav_drawer);
            drawer.closeDrawer(GravityCompat.START);
        }
        return true;
    }

    public void changeNavMenuState() {
        if (!CurrentUser.isConnected()) {
            navigationView.getMenu().findItem(R.id.nav_myParticipations).setEnabled(false);
            navigationView.getMenu().findItem(R.id.nav_myQuizzes).setEnabled(false);
        } else {
            navigationView.getMenu().findItem(R.id.nav_myParticipations).setEnabled(true);
            navigationView.getMenu().findItem(R.id.nav_myQuizzes).setEnabled(true);
        }
    }

    @Override
    protected void onResume() {
        Log.e("resume", "hello");
        getFragmentManager()
                .beginTransaction()
                .replace(R.id.content_frame, new QuizListFragment())
                .commit();
        super.onResume();
    }
}
