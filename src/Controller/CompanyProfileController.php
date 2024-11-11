<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CompanyProfileController extends AbstractController
{
    /**
     * @Route("/company-profile", name="/company-profile")
     */
    public function index(): Response
    {
        return $this->render('company-profile/company-profile.html.twig', [
            'controller_name' => 'CompanyProfileController',
        ]);
    }
}