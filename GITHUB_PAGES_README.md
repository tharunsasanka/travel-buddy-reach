# Deploy Travel Buddy Reach to GitHub Pages

## Apply

Copy the included `.github` and `apps` folders into the root of your existing `travel-buddy-reach` repository. Replace files if prompted.

## Validate locally

```powershell
pnpm --filter @travel-buddy/web build
```

## Commit through a pull request

```powershell
git switch main
git pull --ff-only
git switch -c ci/deploy-github-pages
git add .github/workflows/deploy-pages.yml apps/web/vite.config.ts GITHUB_PAGES_README.md
git commit -m "ci: deploy web app to GitHub Pages"
git push -u origin ci/deploy-github-pages
gh pr create --base main --head ci/deploy-github-pages --title "ci: deploy web app to GitHub Pages" --body "Adds an automated GitHub Pages build and deployment workflow for the web app."
```

Merge the pull request after its checks pass.

## Enable Pages

In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **GitHub Actions** as the source. If it is already selected, no change is needed.

After the deployment workflow succeeds, the site will be available at:

<https://tharunsasanka.github.io/travel-buddy-reach/>
