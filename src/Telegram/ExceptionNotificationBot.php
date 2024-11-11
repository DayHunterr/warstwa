<?php

namespace App\Telegram;

use TelegramBot\Api\Types\Message;

final class ExceptionNotificationBot extends BaseBot
{
    private const MAX_ATTEMPTS = 5;

    /**
     * @var string
     */
    private $locale;

    /**
     * @param string[] $config
     * @param string   $locale
     *
     * @throws \Exception
     */
    public function __construct(array $config, string $locale)
    {
        parent::__construct($config);

        $this->locale = $locale;
    }

    /**
     * @param string $text
     *
     * @return Message|null
     */
    public function notify(string $text): ?Message
    {
        for($attempt = 1; $attempt <= self::MAX_ATTEMPTS; $attempt++){
            try {
                $content = sprintf("meritus_mercatum_%s\n\n%s", $this->locale, $text);
                $message = $this->bot->sendMessage($this->chatId, $content);
                sleep(self::SLEEP_DELAY);

                return $message;
            } catch (\Throwable $ex){
                sleep(self::SLEEP_DELAY);
                continue;
            }
        }

        return null;
    }
}