Chrome Extension: Bookmark Finder
========================

# About
Bookmark Finderはブックマークを検索するシンプルな拡張機能です。  
Bookmark Finder is a simple extension that searches bookmarks.

# Install
Chromeの拡張機能ページを開き、srcフォルダをドラッグ＆ドロップしてください。  
Open the Chrome extension page and drag and drop the src folder.

# Usage
アイコンをクリックすると検索ボックスが開くので、検索ワードを入力してEnterを押してください。タイトルとURLを対象に検索した結果が表示されます。  
Click the icon to open the search box. Enter the search word and press Enter. Search results for title and URL are displayed.

クリックすると現在のタブで開きます。Ctrlキーを押しながらクリックすると新しいタブで開きます。Ctrl + Shiftキーを押しながらクリックすると非アクティブな新しいタブで開きます。  
Click to open in current tab. Clicking while holding down the Ctrl key opens in a new tab. Ctrl + Shift-click to open in a new inactive tab.

Ctrl + 矢印キーで項目を選択し、Enterで開くこともできます。新しいタブで開く動作もクリックと同様です。  
You can also select items with Ctrl + arrow keys and open them with Enter. Opening in a new tab is similar to clicking.

# To Do
- ブックマークを開いたらポップアップを閉じるなどの設定画面を追加する
- オプションで履歴も検索できるようにする
- NOT検索ができるようにする
- フォルダ階層の表示・検索対象化
- 検索対象の値を指定可能にする(例 url:twitter.com)
- ブックマークレットを実行可能にする

# For Developer
めんどくさいので日本語で書いていいですか？　書きますね。

改造したい人向け。ポップアップはpopup-devフォルダをルートとしてvue-cliで開発しています。変更したら`npm run build`するとコンパイルされたものが`プロジェクトルート/src/popup`に吐き出されます。v0.2.0からはバージョンアップしたタイミングでビルドしたものをコミットするようにしました。

Pull Requestは消極的に受け付けています。ライセンスを守っていただければ先に書いたとおり改造は自由ですが、もしかしたら取り込むかもしれません。

# License
<a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br />この 作品 は <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">クリエイティブ・コモンズ 表示 3.0 非移植 ライセンス</a>の下に提供されています。