package com.stickerwall.backend.util;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

public class Sanitizer {

    public static String clean(String input){

        return Jsoup.clean(input, Safelist.none());

    }
}