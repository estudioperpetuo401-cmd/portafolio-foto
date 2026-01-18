import CategoryPageBase from "@/components/CategoryPageBase";

export default async function FashionPage({ params }: { params: { locale: string } }) {
    return <CategoryPageBase category="fashion" locale={params.locale} />;
}
