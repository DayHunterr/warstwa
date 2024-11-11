<?php

namespace App\Controller;

use App\Repository\MenuCountryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

final class MenuController extends AbstractController
{
    public function renderMenu() : Response
    {
        return $this->render('menu.html.twig', [
            'currentCountry' => $countries->findOneBy(['isDefault' => 1]),
            'countries' => $countries->findBy(['isDefault' => 0]),
        ]);
    }
}