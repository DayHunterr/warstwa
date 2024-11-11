<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CompanyListController extends AbstractController
{
    /**
     * @Route("/company-list", name="/company-list")
     */
    public function index(): Response
    {
        return $this->render('company-list/company-list.html.twig', [
            'controller_name' => 'CompanyListController',
        ]);
    }
}