<?php

namespace App\Menu;

use App\Entity\User;
use Knp\Menu\FactoryInterface;
use Knp\Menu\ItemInterface;
use Symfony\Bundle\SecurityBundle\Security;

final class Builder
{
    private FactoryInterface $factory;

    private Security $security;

    public function __construct(FactoryInterface $factory, Security $security)
    {
        $this->factory = $factory;
        $this->security = $security;
    }

    public function createSidebarMenu(array $options): ItemInterface
    {
        /** @var User $user */
        $user = $this->security->getUser();
        $menu = $this->factory->createItem('navbar')->setChildrenAttribute('class', 'navbar-nav');

        // Instead of name in label it will be rendered from $app->getUser()->getName()
        $menu->addChild('Account', ['route' => 'app_account', 'routeParameters' => ['id' => $user->getId()]])
            ->setAttribute('class', 'nav-item mb-2 mt-0')
            ->setAttribute('role', 'button')
            ->setLinkAttribute('class', 'nav-link text-white custom-collapse')
            //->setLinkAttribute('data-action', 'click->hello#toggle')
            ->setExtra('image', $user->getAvatarPath())
            //->setLabelAttribute('class', 'nav-link text-white')
            //->setChildrenAttribute('class', 'nav-link text-white')
            ->setExtra('break', true)
            ->setLabel($user->getName());

        $menu->addChild('Nástěnka', ['route' => 'app_dashboard'])
            ->setAttribute('class', 'nav-item')
            ->setAttribute('role', 'button')
            ->setLinkAttribute('class', 'nav-link text-white custom-collapse')
            ->setLabel('<i class="fa-regular fa-chart-bar"></i>');

        $menu->addChild('Uživatelé', ['route' => 'app_users'])
            ->setAttribute('class', 'nav-item')
            ->setAttribute('role', 'button')
            ->setLinkAttribute('class', 'nav-link text-white custom-collapse')
            ->setLabel('<i class="fa-regular fa-user"></i>');

        $menu->addChild('Ostatní', ['route' => ''])
             ->setAttribute('class', 'nav-item mb-2 mt-0')
             ->setAttribute('role', 'button')
             ->setLinkAttribute('data-action', 'click->hello#toggle')
             ->setLinkAttribute('class', 'nav-link text-white custom-collapse')
             ->setExtra('break', true)
             ->setLabel('dashboard');

        $menu['Ostatní']->addChild('Aktivity', ['route' => 'app_kanban'])
            ->setAttribute('class', 'nav-item')
            ->setLinkAttribute('class', 'nav-link text-white')
            ->setLabel('A');

        $menu['Ostatní']->addChild('Přehled', ['route' => 'app_overview'])
             ->setAttribute('class', 'nav-item')
             ->setAttribute('role', 'button')
             ->setLinkAttribute('class', 'nav-link text-white custom-collapse')
             ->setLabel('P');

        $menu['Ostatní']->addChild('Statistiky', ['route' => 'app_statistics'])
            ->setAttribute('class', 'nav-item')
            ->setLinkAttribute('class', 'nav-link text-white')
            ->setLabel('S');

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
//        $menu->addChild('About Me', ['route' => 'app_kanban']);
        // you can also add sub levels to your menus as follows
//        $menu['About Me']->addChild('Edit profile', ['route' => 'app_kanban']);

        // ... add more children

        return $menu;
    }
}