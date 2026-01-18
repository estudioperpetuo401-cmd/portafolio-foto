import CategoryPageBase from "@/components/CategoryPageBase";

export default async function SocialPage({ params }: { params: { locale: string } }) {
    return <CategoryPageBase category="social" locale={params.locale} />;
}
