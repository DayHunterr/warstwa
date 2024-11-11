<?php

namespace App\Form;

use Symfony\Component\Console\Question\Question;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class QuestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('companyName', TextType::class, [
                'label' => false,
                'attr' => [
                    'class' => 'contact-us__form-input',
                    'placeholder' => 'Nazwa firmy',
                    'data-validation' => 'required',
                ]
            ])
            ->add('phone', TelType::class, [
                'label' => false,
                'attr' => [
                    'class' => 'contact-us__form-input',
                    'placeholder' => 'Numer telefonu',
                    'data-validation' => 'required,integer,min'
                ]
            ])
            ->add('submit', SubmitType::class, [
                'label' => false,
                'attr' => [
                    'class' => 'contact-us__form-submit',
                    'formnovalidate' => 'true',
                    'data-action' => 'click->homepage#askQuestion'
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void{
        $resolver->setDefaults([
            'data_class' => Question::class,
            'attr' => [
                'autocomplete' => 'off',
            ]
        ]);
    }
}