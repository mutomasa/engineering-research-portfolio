"""『Opsの進化とPlatform Engineering』の原稿を AI/IT技術タブ（/tech）用の Markdown に変換する。

原稿は books/ops_platform_engineering_book（執筆リポジトリへのシンボリックリンク）の manuscript/ にある。
出力先は src/content/tech/ops-platform-engineering/。原稿を改訂したら、このスクリプトを再実行する。

    python3 books/export_ops_platform_engineering.py
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "books" / "ops_platform_engineering_book" / "manuscript"
OUT = ROOT / "src" / "content" / "tech" / "ops-platform-engineering"
SERIES = "ops-platform-engineering"
UPDATED = "2026-11-16"

# (原稿ファイル, 出力 slug, ラベル, タグ)
CHAPTERS = [
    ("00_preface.md", "00-preface", "序章", ["Operations", "Platform Engineering"]),
    ("ch01_origins_of_it_operations.md", "01-origins-of-it-operations", "第1章", ["IT Operations", "ITSM", "SNMP"]),
    ("ch02_monitoring_tools.md", "02-monitoring-tools", "第2章", ["Monitoring", "Nagios", "Zabbix"]),
    ("ch03_beyond_monitoring.md", "03-beyond-monitoring", "第3章", ["Incident Management", "Runbook", "Postmortem"]),
    ("ch04_devops.md", "04-devops", "第4章", ["DevOps", "CI/CD"]),
    ("ch05_sre.md", "05-sre", "第5章", ["SRE", "SLO", "Error Budget"]),
    ("ch06_cloud_native.md", "06-cloud-native", "第6章", ["Cloud Native", "Kubernetes", "GitOps"]),
    ("ch07_observability.md", "07-observability", "第7章", ["Observability", "OpenTelemetry"]),
    ("ch08_why_xops.md", "08-why-xops", "第8章", ["XOps"]),
    ("ch09_mlops.md", "09-mlops", "第9章", ["MLOps", "Machine Learning"]),
    ("ch10_dataops_aiops.md", "10-dataops-aiops", "第10章", ["DataOps", "AIOps"]),
    ("ch11_devsecops_finops.md", "11-devsecops-finops", "第11章", ["DevSecOps", "FinOps"]),
    ("ch12_llmops.md", "12-llmops", "第12章", ["LLMOps", "LLM"]),
    ("ch13_agentops.md", "13-agentops", "第13章", ["AgentOps", "AI Agent"]),
    ("ch14_why_platform_engineering.md", "14-why-platform-engineering", "第14章", ["Platform Engineering"]),
    ("ch15_idp_technologies.md", "15-idp-technologies", "第15章", ["Internal Developer Platform", "Backstage"]),
    ("ch16_platform_architecture.md", "16-platform-architecture", "第16章", ["Platform Engineering", "Architecture"]),
    ("ch17_cloud_implementation.md", "17-cloud-implementation", "第17章", ["AWS", "Azure", "Google Cloud"]),
    ("ch18_data_platform_governance.md", "18-data-platform-governance", "第18章", ["Data Platform", "Data Governance"]),
    ("ch19_agent_mesh.md", "19-agent-mesh", "第19章", ["Agent Mesh", "AI Agent"]),
    ("ch20_agent_governance_security.md", "20-agent-governance-security", "第20章", ["AI Agent", "Security", "Governance"]),
    ("ch21_software_factory.md", "21-software-factory", "第21章", ["Software Factory", "AI Coding Agent"]),
    ("ch22_self_improving_platform.md", "22-self-improving-platform", "第22章", ["Self-Improving Systems", "AI Agent"]),
    ("ch23_future_of_platform_engineering.md", "23-future-of-platform-engineering", "第23章", ["Platform Engineering", "Future"]),
    ("appendices.md", "appendices", "付録", ["Timeline", "Glossary"]),
    ("references.md", "references", "参考文献", ["References"]),
]

DESCRIPTIONS = {
    "00-preface": "運用すべき対象と責任が増え続けるなかで、なぜOpsとPlatform Engineeringを一緒に考えるのか。本書の中心命題、構成、読み方を紹介します。",
    "appendices": "IT運用とPlatform Engineeringの年表、主要用語の定義と出典方針、クラウド／データ基盤のサービス比較と責任分界、全章共通の実践シナリオ。",
    "references": "本書の各章が参照する中核資料（R01〜R50）と補助文献の一覧、および執筆・引用ルール。",
}

FENCE = re.compile(r"^(```|~~~)")


def split_outside_fences(lines: list[str]):
    """各行に「コードブロックの外か」のフラグを付けて返す。"""
    in_fence = False
    for line in lines:
        if FENCE.match(line.strip()):
            yield line, False
            in_fence = not in_fence
            continue
        yield line, not in_fence


def first_paragraph_after(lines: list[str], heading: str) -> str | None:
    for i, line in enumerate(lines):
        if line.strip() == heading:
            for rest in lines[i + 1 :]:
                text = rest.strip()
                if text and not text.startswith(("#", ">", "|", "-", "```")):
                    return text
    return None


def clean_text(text: str) -> str:
    text = re.sub(r"\[R\d+\]", "", text)
    text = text.replace("**", "")
    return text.strip()


def convert(src_name: str, slug: str, label: str, order: int, tags: list[str]) -> None:
    lines = (SRC / src_name).read_text(encoding="utf-8").splitlines()
    title = ""
    part_title = ""
    part_body: list[str] = []
    body: list[str] = []
    state = "head"  # head -> part -> body

    for line, outside in split_outside_fences(lines):
        h1 = outside and line.startswith("# ")
        if state == "head":
            if h1 and re.match(r"# 第[ⅠⅡⅢⅣⅤⅥ]+部", line):
                part_title = line[2:].strip()
                state = "part"
            elif h1 and (slug != "00-preface" or line.startswith("# はじめに")):
                title = line[2:].strip()
                state = "body"
            continue
        if state == "part":
            if h1:
                title = line[2:].strip()
                state = "body"
            else:
                part_body.append(line)
            continue
        # 付録は「# 付録A …」を ## に、その下の見出しを1段下げる
        if slug == "appendices" and outside and re.match(r"^#{1,5} ", line):
            line = "#" + line
        body.append(line)

    # 先頭の見出しからラベルを除いたものをタイトルにする（例: 「第1章　…」→「…」）
    title = re.sub(r"^(第\d+章|はじめに――)\s*", "", title).strip() or title
    if slug == "appendices":
        title = "年表・用語・サービス比較・共通シナリオ"
    if slug == "references":
        title = "参考文献一覧"
    if slug == "00-preface":
        title = "はじめに ― " + title if not title.startswith("はじめに") else title

    while body and body[0].strip() in ("", "---"):
        body.pop(0)
    while body and body[-1].strip() in ("", "---"):
        body.pop()
    # 付録の部の区切り（---）は見出しで区切られるので残しても問題ないが、連続する空行は詰める
    text = "\n".join(body)
    text = re.sub(r"\n{3,}", "\n\n", text)

    if part_title:
        while part_body and part_body[-1].strip() in ("", "---"):
            part_body.pop()
        while part_body and not part_body[0].strip():
            part_body.pop(0)
        quoted = "\n".join(("> " + l) if l.strip() else ">" for l in part_body)
        text = f"> **{part_title}**\n>\n{quoted}\n\n{text}"

    desc = DESCRIPTIONS.get(slug) or clean_text(first_paragraph_after(lines, "## 本章の問い") or title)
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
    for i, (src_name, slug, label, tags) in enumerate(CHAPTERS):
        order = {"appendices": 90, "references": 99}.get(slug, i)
        convert(src_name, slug, label, order, tags)
    print(f"wrote {len(CHAPTERS)} files to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
