<?php

namespace App\Controller;

use App\Form\QuestionType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

final class QuestionController extends AbstractController
{

    /**
     * @return Response
     */
    public function renderQuestionForm() : Response
    {
        return $this->render('contact-us/form.html.html.twig', [
            'form' => $this->createForm(QuestionType::class)->createView()
        ]);
    }


}