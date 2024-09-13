<?php

namespace App\Entity;

enum AppDesignEnum: string
{
    case DARK = 'dark';
    case LIGHT = 'light';
    case AUTO = 'auto';
}