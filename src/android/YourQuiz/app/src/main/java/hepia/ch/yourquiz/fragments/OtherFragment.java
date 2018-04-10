package hepia.ch.yourquiz.fragments;

import android.app.Fragment;
import android.app.FragmentManager;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import org.apmem.tools.layouts.FlowLayout;

import hepia.ch.yourquiz.R;

public class OtherFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
//        return
//        FlowLayout flowLayout = container.findViewById(R.id.myFlowLayout);
        FragmentManager fragmentManager = getFragmentManager();
        fragmentManager.beginTransaction()
                .add(R.id.myFlowLayout, new QuizElementFragment())
                .commit();
        return inflater.inflate(R.layout.fragment_other, container, false);
    }
}
