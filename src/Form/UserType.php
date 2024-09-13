<?php

namespace App\Form;

use App\Entity\Currency;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\Enum\AppDesignEnum;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Validator\Constraints\File;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class)
            ->add('roles', ChoiceType::class, [
                'choices' => [
                    'User' => 'ROLE_USER',
                    'Admin' => 'ROLE_ADMIN',
                ],
                'multiple' => true,
                'expanded' => false,
            ])
            ->add('firstName', TextType::class)
            ->add('lastName', TextType::class)
            ->add('avatar', FileType::class, [
                'required' => false,
                'label' => 'Upload Avatar',
                'mapped' => false,
                'constraints' => [
                    new File([
                        'maxSize' => '1024k',
                        'mimeTypes' => [
                            'image/jpeg',
                            'image/png',
                            'image/gif',
                        ],
                        'mimeTypesMessage' => 'Please upload a valid image file (JPEG, PNG, GIF)',
                    ])
                ]
            ])
            ->add('active', CheckboxType::class, ['required' => false])
//            ->add('birthDate', DateType::class, ['widget' => 'single_text', 'required' => false])
            ->add('currency', EntityType::class, [
                'class' => Currency::class,
                'choice_label' => 'name',
            ])
            ->add('degree', TextType::class, ['required' => false])
            ->add('description', TextareaType::class, ['required' => false])
            ->add('monthlyHours', IntegerType::class, ['required' => false])
            ->add('holidayHours', IntegerType::class, ['required' => false])
            ->add('hourlyWage', TextType::class, ['required' => false])
            ->add('lang', TextType::class, ['required' => false])
//            ->add('workSince', DateType::class, ['widget' => 'single_text', 'required' => false])
            ->add('appDesign', ChoiceType::class, [
                'choices' => AppDesignEnum::cases(),
                'choice_label' => fn(AppDesignEnum $enum) => $enum->name,
//                'multiple' => true,
//                'expanded' => false,
            ])
            ->add('appSidebarSpread', CheckboxType::class, ['required' => false])
            ->add('appSidebarType', ChoiceType::class, [
                'choices' => AppDesignEnum::cases(),
                'choice_label' => fn(AppDesignEnum $enum) => $enum->name,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
