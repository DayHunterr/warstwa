<?php

namespace App\Telegram;

use TelegramBot\Api\BotApi;

class BaseBot
{
    protected const PARSE_MODE_HTML     = 'html';
    protected const PARSE_MODE_MARKDOWN = 'markdown';

    protected const SLEEP_DELAY = 10;

    /**
     * @var BotApi
     */
    protected $bot;

    /**
     * @var string
     */
    protected $chatId;

    /**
     * @param string[] $config
     *
     * @throws \Exception
     */
    public function __construct(array $config)
    {
        $this->bot    = new BotApi($config['token']);
        $this->chatId = $config['chatId'];
    }
}