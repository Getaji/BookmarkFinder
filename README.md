Chrome Extension: Bookmark Finder
========================

# 概要
Bookmark Finderはブックマークを検索するシンプルな拡張機能です。

# インストール
`Clone or download`などからリポジトリをローカルにダウンロードし、Chromeの拡張機能ページを開き、srcフォルダをドラッグ＆ドロップしてください。

# 使い方
アイコンをクリックすると検索ボックスが開くので、検索ワードを入力してEnterを押してください。タイトルとURLを対象に検索した結果が表示されます。検索ワードには特殊な書式を使うことができます、利用可能な書式は以下の通りです。

|書式|機能|
|----|----|
|title:タイトル|ブックマークのタイトルを検索します。|
|url:URL|ブックマークのURLを検索します。|
|dir:ディレクトリ|フォルダ構造を検索します。`/`でフォルダ階層を区切ります。<br>先頭に`/`があると先頭に一致するか検索します。<br>末尾に`/`があると末尾に一致するか検索します。<br>両方にあると完全に一致するか検索します。|

検索結果をクリックするとポップアップを維持しつつ現在のタブで開きます。Ctrlキーを押しながらクリックするとポップアップを閉じて新しいタブで開きます。Ctrl + Shiftキーを押しながらクリックするとポップアップを維持しつつ非アクティブな新しいタブで開きます。

Ctrl + 矢印キーで項目を選択し、Enterで開くこともできます。新しいタブで開く動作もクリックと同様です。

# To Do
- ブックマークを開いたらポップアップを閉じるなどの設定画面を追加する
- オプションで履歴も検索できるようにする
- フォルダ階層の表示
- ブックマークレットを実行可能にする

# 開発者向け
ポップアップはpopup-devフォルダをルートとしてvue-cliで開発しています。変更したら`npm run build`するとコンパイルされたものが`プロジェクトルート/src/popup`に吐き出されます。v0.2.0からはバージョンアップしたタイミングでビルドしたものをコミットするようにしました。

Pull Requestは消極的に受け付けています。ライセンスを守っていただければ先に書いたとおり改造は自由ですが、もしかしたら取り込むかもしれません。

# ライセンス
<a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br />この 作品 は <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">クリエイティブ・コモンズ 表示 3.0 非移植 ライセンス</a>の下に提供されています。