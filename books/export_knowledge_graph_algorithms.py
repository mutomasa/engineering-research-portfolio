"""『知識グラフとグラフアルゴリズム』の原稿を AI/IT技術タブ（/tech）用の Markdown に変換する。

原稿は books/knowledge_graph_graph_algorithms_book（執筆リポジトリへのシンボリックリンク）にある。
出力先は src/content/tech/knowledge-graph-algorithms/。原稿を改訂したら、このスクリプトを再実行する。

    python3 books/export_knowledge_graph_algorithms.py
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "books" / "knowledge_graph_graph_algorithms_book"
OUT = ROOT / "src" / "content" / "tech" / "knowledge-graph-algorithms"
SERIES = "knowledge-graph-algorithms"
UPDATED = "2026-11-17"

# (原稿ファイル, 出力 slug, タグ)
CHAPTERS = [
    ("00_前書き.md", "00-preface", ["Knowledge Graph", "Graph Algorithms"]),
    ("01_はじめに.md", "01-introduction", ["Knowledge Graph", "Graph Algorithms"]),
    ("02_グラフ理論と知識グラフの数学的基礎.md", "02-mathematical-foundations", ["Graph Theory", "Meta-path", "Graph Projection"]),
    ("03_経路探索.md", "03-path-finding", ["BFS", "Dijkstra", "A*"]),
    ("04_中心性分析.md", "04-centrality", ["Centrality", "PageRank", "Betweenness"]),
    ("05_コミュニティ検出.md", "05-community-detection", ["Louvain", "Leiden", "Label Propagation"]),
    ("06_類似性分析.md", "06-similarity", ["Jaccard", "Common Neighbors", "SimRank"]),
    ("07_リンク予測.md", "07-link-prediction", ["Link Prediction", "Adamic-Adar"]),
    ("08_グラフ表現学習.md", "08-graph-representation-learning", ["Node2Vec", "GraphSAGE", "R-GCN"]),
    ("09_オントロジーと論理推論.md", "09-ontology-reasoning", ["Ontology", "RDFS", "OWL", "SHACL"]),
    ("10_GraphRAGとAIエージェント.md", "10-graphrag-ai-agents", ["GraphRAG", "AI Agent"]),
    ("11_ライブラリと分析基盤.md", "11-libraries-platforms", ["NetworkX", "Neo4j GDS", "PyTorch Geometric"]),
    ("12_実装ハンズオン.md", "12-hands-on", ["Neo4j", "Cypher", "Python"]),
    ("13_設計と評価の論点.md", "13-design-evaluation", ["Evaluation", "Data Quality"]),
    ("14_応用シナリオ.md", "14-applications", ["Security", "Manufacturing", "Drug Discovery", "Robotics"]),
    ("15_学習ロードマップとまとめ.md", "15-roadmap-summary", ["Roadmap"]),
    ("16_用語集.md", "appendix-a-glossary", ["Glossary"]),
    ("17_参考文献.md", "appendix-b-references", ["References"]),
]

DESCRIPTIONS = {
    "00-preface": "製造業のオントロジー、創薬と量子コンピューティングの研究開発の経験から、知識グラフにグラフアルゴリズムを適用すると何を計算でき、どんな価値が得られるのかを問う。本書の背景と位置づけ。",
    "02-mathematical-foundations": "グラフの数学的定義、隣接行列と隣接リスト、重み付き・有向グラフ、知識グラフの三つ組、関係の組合せと行列積、メタパス、グラフ射影。アルゴリズムを適用する前の数理的な土台を整理する。",
    "07-link-prediction": "観測されていない接続の候補をスコア化するリンク予測。Adamic-Adar と Preferential Attachment の数式と実装、関係タイプを持つ知識グラフでの予測、MRR などのランキング評価を解説する。",
    "11-libraries-platforms": "NetworkX、igraph、Neo4j Graph Data Science、PyTorch Geometric などのライブラリとグラフストレージを、用途・規模・計算基盤の観点で比較し、選び方を整理する。",
    "14-applications": "セキュリティの攻撃グラフ、人材・スキル・案件のマッチング、製造業のオントロジー、創薬、量子計算によるグラフ最適化、ロボティクスの Scene Graph に、知識グラフとグラフアルゴリズムをどう使うか。",
    "appendix-a-glossary": "知識グラフ、オントロジー、グラフアルゴリズム、グラフ機械学習、GraphRAG などの主要用語と、それを扱う章の一覧。",
    "appendix-b-references": "本書で扱ったアルゴリズムの原典論文と、NetworkX・Neo4j GDS・igraph・PyTorch Geometric などの公式ドキュメントの一覧。",
}

FENCE = re.compile(r"^(```|~~~)")
LINK = re.compile(r"\]\(([^)#\s]+\.md)(#[^)]*)?\)")
SLUG_BY_FILE = {src: slug for src, slug, _ in CHAPTERS}


def split_outside_fences(lines: list[str]):
    """各行に「コードブロックの外か」のフラグを付けて返す。"""
    in_fence = False
    for line in lines:
        if FENCE.match(line.strip()):
            yield line, False
            in_fence = not in_fence
            continue
        yield line, not in_fence


def first_paragraph(lines: list[str]) -> str:
    """本文の最初の段落（見出し・表・図・コードを除く）を返す。"""
    for line, outside in split_outside_fences(lines):
        text = line.strip()
        if outside and text and not text.startswith(("#", ">", "|", "-", "$", "!", "<")) and not re.match(r"^\d+\. ", text):
            return text
    return ""


def clean_text(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\$([^$]+)\$", r"\1", text)
    return text.replace("**", "").replace("`", "").strip()


def rewrite_links(line: str) -> str:
    """章間の相対リンク（03_経路探索.md）をサイト内の URL に置き換える。"""

    def repl(m: re.Match[str]) -> str:
        slug = SLUG_BY_FILE.get(m.group(1))
        if slug is None:
            raise SystemExit(f"unknown link target: {m.group(1)}")
        return f"](/tech/{SERIES}/{slug}{m.group(2) or ''})"

    return LINK.sub(repl, line)


def convert(src_name: str, slug: str, order: int, tags: list[str]) -> None:
    lines = (SRC / src_name).read_text(encoding="utf-8").splitlines()
    heading = lines[0]
    assert heading.startswith("# "), f"{src_name}: 先頭が H1 ではない"
    heading = heading[2:].strip()

    m = re.match(r"^(第\d+章|付録[A-Z])\s+(.+)$", heading)
    label, title = (m.group(1), m.group(2)) if m else (heading, heading)
    if slug == "00-preface":
        label, title = "前書き", "本書の背景と位置づけ"

    body = [rewrite_links(l) if outside else l for l, outside in split_outside_fences(lines[1:])]
    while body and body[0].strip() in ("", "---"):
        body.pop(0)
    while body and body[-1].strip() in ("", "---"):
        body.pop()
    text = re.sub(r"\n{3,}", "\n\n", "\n".join(body))

    desc = DESCRIPTIONS.get(slug) or clean_text(first_paragraph(body))
    if len(desc) > 160:
        desc = desc[:159] + "…"

    def q(s: str) -> str:
        return "'" + s.replace("'", "''") + "'"

    front = [
        "---",
        f"title: {q(title)}",
        f"description: {q(desc)}",
        f"updated: {UPDATED}",
        f"series: {SERIES}",
        f"order: {order}",
        f"label: {q(label)}",
        "tags: [" + ", ".join(q(t) for t in tags) + "]",
        "---",
        "",
        "",
    ]
    (OUT / f"{slug}.md").write_text("\n".join(front) + text + "\n", encoding="utf-8")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for i, (src_name, slug, tags) in enumerate(CHAPTERS):
        order = {"appendix-a-glossary": 90, "appendix-b-references": 99}.get(slug, i)
        convert(src_name, slug, order, tags)
    print(f"wrote {len(CHAPTERS)} files to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
