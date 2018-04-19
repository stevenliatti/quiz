package hepia.ch.yourquiz.fragments;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import hepia.ch.yourquiz.R;
import hepia.ch.yourquiz.customUI.ViewPagerAdapter;

public class RankingFragment extends Fragment{

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_ranking, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        ViewPager viewPager = view.findViewById(R.id.ranking_pager);
        ViewPagerAdapter adapter = new ViewPagerAdapter(((AppCompatActivity)getActivity()).getSupportFragmentManager());

        // Add Fragments to adapter one by one
        adapter.addFragment(new GeneralRankingFragment(), "Général");
        adapter.addFragment(new MostPlayedFragment(), "Quiz populqires");
        viewPager.setAdapter(adapter);

        TabLayout tabLayout = view.findViewById(R.id.ranking_tabs);
        tabLayout.setupWithViewPager(viewPager);
    }
}
