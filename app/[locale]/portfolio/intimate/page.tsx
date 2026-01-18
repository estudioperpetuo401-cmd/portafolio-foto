import CategoryPageBase from "@/components/CategoryPageBase";

export default async function IntimatePage({ params }: { params: { locale: string } }) {
    return <CategoryPageBase category="intimate" locale={params.locale} />;
}
