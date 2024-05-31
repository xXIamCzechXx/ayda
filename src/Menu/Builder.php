<?php

namespace App\Menu;

use Knp\Menu\FactoryInterface;
use Knp\Menu\ItemInterface;

final class Builder
{
    private FactoryInterface $factory;

    public function __construct(FactoryInterface $factory)
    {
        $this->factory = $factory;
    }

    public function createSidebarMenu(array $options): ItemInterface
    {
        $menu = $this->factory->createItem('navbar')->setChildrenAttribute('class', 'navbar-nav');

        $menu->addChild('Hlavní strana', ['route' => 'app_default'])
             ->setAttribute('class', 'nav-item')
             ->setAttribute('role', 'button')
             ->setLinkAttribute('class', 'nav-link text-white custom-collapse')
             //->setLinkAttribute('data-action', 'click->hello#toggle')
             //->setExtra('image', '/path/to/your/image.jpg');
             //->setLabelAttribute('class', 'nav-link text-white')
             //->setChildrenAttribute('class', 'nav-link text-white')
             ->setExtra('first_level', true)
             ->setLabel('dashboard');

        $menu['Hlavní strana']->addChild('Statistiky', ['route' => 'app_statistics'])
            ->setAttribute('class', 'nav-item')
            ->setLinkAttribute('class', 'nav-link text-white')
            ->setExtra('second_level', true)
            ->setLabel('S');

        $menu['Hlavní strana']->addChild('Aktivity', ['route' => 'app_dashboard'])
            ->setAttribute('class', 'nav-item')
            ->setLinkAttribute('class', 'nav-link text-white')
            ->setExtra('second_level', true)
            ->setLabel('A');

//        // access services from the container!
//        $em = $this->container->get('doctrine')->getManager();
//        // findMostRecent and Blog are just imaginary examples
//        $blog = $em->getRepository(Blog::class)->findMostRecent();
//
//        $menu->addChild('Latest Blog Post', [
//            'route' => 'blog_show',
//            'routeParameters' => ['id' => $blog->getId()]
//        ]);

        // create another menu item
        $menu->addChild('About Me', ['route' => 'app_dashboard']);
        // you can also add sub levels to your menus as follows
        $menu['About Me']->addChild('Edit profile', ['route' => 'app_dashboard']);

        // ... add more children

        dump($menu);
        return $menu;
    }
}