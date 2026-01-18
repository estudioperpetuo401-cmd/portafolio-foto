import CategoryPageBase from "@/components/CategoryPageBase";

export default async function PortraitPage({ params }: { params: { locale: string } }) {
    return <CategoryPageBase category="portrait" locale={params.locale} />;
}
