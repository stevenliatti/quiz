package hepia.ch.yourquiz;

import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import hepia.ch.yourquiz.customUI.ViewPagerAdapter;
import hepia.ch.yourquiz.fragments.GeneralRankingFragment;
import hepia.ch.yourquiz.fragments.MostPlayedFragment;

public class RankingActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ranking);

        ViewPager viewPager = findViewById(R.id.ranking_pager);
        ViewPagerAdapter adapter = new ViewPagerAdapter(getSupportFragmentManager());

        // Add Fragments to adapter one by one
        adapter.addFragment(new GeneralRankingFragment(), "Général");
        adapter.addFragment(new MostPlayedFragment(), "Quiz populaires");
        viewPager.setAdapter(adapter);

        TabLayout tabLayout = findViewById(R.id.ranking_tabs);
        tabLayout.setupWithViewPager(viewPager);
    }
}
