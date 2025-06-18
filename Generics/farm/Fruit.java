package z.practice.farm;

import java.util.Objects;

public class Fruit extends Farm{
    private String name;

    public Fruit() {
    }

    public Fruit(String kind , String name) {
        super(kind);
        this.name = name;
    }

    @Override
    public String toString() {
        return super.toString() + " : " + name;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Fruit fruit = (Fruit) o;
        return Objects.equals(name, fruit.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
