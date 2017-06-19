# FAX2Zendesk

## 概要

Twilio FAXを受信すると、受信したFAXをZendeskのチケットに変換します。
本スクリプトはTwilio Functionsで実行されるため、サーバーは不要です。

## セットアップ

1. ソースコードをCloneします。
```
$ git clone https://github.com/twilioforkwc/fax2zendesk.git
```
2. Twilioの管理コンソールにログインします。
3. DEVELOPER TOOLSのRuntime、Functionsを選択します。
4. ＋アイコンを押してFunctionsを新規作成します。
5. FUNCTION NAMEに、fax2zendeskと入力します。
6. PATHに、/fax2zendeskと入力します。
7. CODE欄にCloneしたfax2zendesk.jsの内容を貼り付けます。
8. ACCESS CONTROLのチェックは付けます。
9. EVENTは未選択で構いません。
10. SAVEボタンを押して、設定を保存します。
11. 左メニューのFunctionsの中の設定を選択します。
12. Environmental Variablesの＋アイコンを押します。
13. KEYにZENDESK_DOMAIN、VALUEに、お使いのzendeskのドメイン名（xxxx.zendesk.com）を入力します。
14. ＋アイコンを押します。
15. KEYにZENDESK_USERNAME、VALUEに、zendeskのエージェントのメールアドレスを入力します。
16. ＋アイコンを押します。
17. KEYにZENDESK_PASSWORD、VALUEに、zendeskのエージェントのパスワードを入力します。
18. 左メニューの概要を選択します。
19. YOUR DOMAINの部分を控えておきます。
20. 左メニューのTwiML Binsを選択します。
21. ＋アイコンを押します。
22. FRIENDLY NAMEに、fax2zendeskと入力します。
23. TWIML欄には、CloneしたTwiML.xmlの内容を貼り付けます。
24. 3行目のactionパラメータのURLを、先程保存しておいたYOUR DOMAINのURLに置き換えます。
25. SAVEボタンを押して、設定を保存します。
