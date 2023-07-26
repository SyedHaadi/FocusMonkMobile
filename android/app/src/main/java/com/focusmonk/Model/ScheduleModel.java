package com.focusmonk.Model;

import java.util.ArrayList;

public class ScheduleModel {

    String start_minute, end_minute, break_start_time, break_end_time;
    int day;
    Integer[] duty_hours, break_hours;

    public String getStart_minute() {
        return start_minute;
    }

    public void setStart_minute(String start_minute) {
        this.start_minute = start_minute;
    }

    public String getEnd_minute() {
        return end_minute;
    }

    public void setEnd_minute(String end_minute) {
        this.end_minute = end_minute;
    }

    public String getBreak_start_time() {
        return break_start_time;
    }

    public void setBreak_start_time(String break_start_time) {
        this.break_start_time = break_start_time;
    }

    public String getBreak_end_time() {
        return break_end_time;
    }

    public void setBreak_end_time(String break_end_time) {
        this.break_end_time = break_end_time;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public Integer[] getDuty_hours() {
        return duty_hours;
    }

    public void setDuty_hours(Integer[] duty_hours) {
        this.duty_hours = duty_hours;
    }

    public Integer[] getBreak_hours() {
        return break_hours;
    }

    public void setBreak_hours(Integer[] break_hours) {
        this.break_hours = break_hours;
    }
}