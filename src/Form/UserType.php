<?php

namespace App\Form;

use App\Entity\Currency;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email')
            ->add('roles')
            ->add('password')
            ->add('firstName')
            ->add('lastName')
            ->add('avatar')
            ->add('active')
            ->add('birthDate', null, [
                'widget' => 'single_text',
            ])
            ->add('degree')
            ->add('description')
            ->add('monthlyHours')
            ->add('holidayHours')
            ->add('hourlyWage')
            ->add('lang')
            ->add('workSince', null, [
                'widget' => 'single_text',
            ])
            ->add('appDesign')
            ->add('appSidebarSpread')
            ->add('appSidebarType')
            ->add('createdAt', null, [
                'widget' => 'single_text',
            ])
            ->add('updatedAt', null, [
                'widget' => 'single_text',
            ])
            ->add('currency', EntityType::class, [
                'class' => Currency::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
