<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType as BasePasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotCompromisedPassword;

class PasswordType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('currentPassword', BasePasswordType::class, [
                'label' => 'Stávajicí heslo',
                'label_attr' => ['class' => 'form-label'],
                'constraints' => new NotBlank(),
            ])
            ->add('newPassword', BasePasswordType::class, [
                'label' => 'Nové heslo',
                'label_attr' => ['class' => 'form-label'],
                'constraints' => [
                    new NotBlank(),
                    new Length(['min' => 6]),
                   //new NotCompromisedPassword(),
                ],
            ])
            ->add('repeatPassword', BasePasswordType::class, [
                'label' => 'Opakujte nové heslo',
                'label_attr' => ['class' => 'form-label'],
                'constraints' => [new NotBlank()],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}