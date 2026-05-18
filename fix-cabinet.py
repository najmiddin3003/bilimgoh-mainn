import re

path = r"components/shared/cabinet.tsx"
with open(path, encoding="utf-8") as f:
    c = f.read()

c = re.sub(
    r'<div className="grid grid-cols-4 gap-4 sm:gap-5">\s*\{selectedAwards\.map\(\(award\) => \{.*?\}\)\}\s*</div>',
    "<AwardsGrid awards={allAwards.slice(0, 8)} compact />",
    c,
    count=1,
    flags=re.DOTALL,
)

c = re.sub(
    r'\{activeTab === "awards" && \(\s*<motionBar className="mt-6 grid grid-cols-4 gap-4 sm:grid-cols-4 sm:gap-5">\s*\{selectedAwards\.map\(\(award\) => \{.*?\}\)\}\s*</motionBar>\s*\)\}',
    '{activeTab === "awards" && (\n              <div className="mt-6">\n                <AwardsGrid awards={allAwards} />\n              </div>\n            )}',
    c,
    count=1,
    flags=re.DOTALL,
)

# fallback if awards block still uses div
c = re.sub(
    r'\{activeTab === "awards" && \(\s*<div className="mt-6 grid grid-cols-4 gap-4 sm:grid-cols-4 sm:gap-5">\s*\{selectedAwards\.map\(\(award\) => \{.*?\}\)\}\s*</div>\s*\)\}',
    '{activeTab === "awards" && (\n              <div className="mt-6">\n                <AwardsGrid awards={allAwards} />\n              </div>\n            )}',
    c,
    count=1,
    flags=re.DOTALL,
)

with open(path, "w", encoding="utf-8", newline="\n") as f:
    f.write(c)

print("selectedAwards left:", "selectedAwards" in c)
